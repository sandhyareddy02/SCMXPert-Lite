from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from bson import ObjectId
from datetime import datetime
from BackEnd.models import User_Signup, User_Login, Device_Data, Shipment_Details, User_Response
from BackEnd.db import mongodb
from BackEnd.jwt import get_token, verify_token  # Assuming JWT methods are imported correctly

# Setup CORS middleware
origins = ["*"]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create user (signup)
@app.post("/createUser")
def create_user(user: User_Signup):
    try:
        if user.name and user.email and user.password:
            # Check if the user already exists
            findEmail = mongodb['users'].find_one({'email': user.email})
            if findEmail is None:
                hashed_password = pwd_context.hash(user.password)
                # Insert user into the database
                mongodb['users'].insert_one({'name': user.name, 'email': user.email, 'password': hashed_password})
                return {"message": "User created successfully"}
            else:
                return {"message": "User already exists"}
        else:
            return {"message": "Please provide all user details correctly"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# User login
@app.post("/loginUser")
async def login_user(login_user: User_Login):
    try:
        data = mongodb['users'].find_one({'email': login_user.email})
        if data:
            password_check = pwd_context.verify(login_user.password, data['password'])
            if password_check:
                # return {""}
                # Create token
                token = await get_token(data)
                user_response={}
                user_response["email"]=data['email'] 
                user_response["name"]=data['name']
                return {"message": "Login successful", "token": token, "user": user_response}
            else:
                return {"message": "Incorrect password"}
        else:
            return {"message": "User not found, please sign up"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# Forgot password
@app.post("/forgotPassword")
async def forgot_password(new_credentials: User_Login):
    try:
        data = mongodb['users'].find_one({'email': new_credentials.email})
        if data:
            password_check = pwd_context.verify(new_credentials.password, data['password'])
            if password_check:
                return {"message": "Entered password is same as old one, please enter a new one"}
            else:
                hashed_password = pwd_context.hash(new_credentials.password)
                mongodb['users'].find_one_and_update({'email': new_credentials.email}, {"$set": {'password': hashed_password}})
                return {"message": "Password updated successfully"}
        else:
            return {"message": "User not found, please sign up"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

# Get device data stream (with JWT verification)
@app.get("/datastream")
async def get_data_stream(tokensss: str = Depends(verify_token)):
    try:
        data = list(mongodb['stream'].find())
        return [{"Battery_Level": int(item["Battery_Level"]),
                 "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
                 "Device_ID": str(item["Device_ID"]),
                 "Route_From": str(item["Route_From"]),
                 "Route_To": str(item["Route_To"])} for item in data]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can't get data")

# Create shipment
@app.post("/createShipment")
def create_shipment(data: Shipment_Details, token: str = Depends(verify_token)):
    try:
        mongodb['shipment_created'].insert_one({
            'Shipment_Number': data.shipment_number,
            'Container_Number': data.container_number,
            'PO_Number': data.po_number,
            'Delivery_Number': data.delivery_number,
            'NDC_Number': data.ndc_number,
            'Batch_Id': data.batch_id,
            'Serial_Number': data.serial_number,
            'Shipment_Description': data.shipment_description
        })
        return {"message": "Shipment created successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized Entry")


