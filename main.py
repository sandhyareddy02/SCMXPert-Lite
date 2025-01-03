
from fastapi import FastAPI, HTTPException, status, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from bson import ObjectId
from datetime import datetime
from BackEnd.models import User_Signup, User_Login, Device_Data, Shipment_Details, User_Response
from BackEnd.db import database  # Assuming you have a MongoDB connection setup
from BackEnd.jwt import verify_token, oauth2_scheme  # Import from jwt.py
from BackEnd.jwt import get_token
from BackEnd.models import ResetPasswordRequest
from BackEnd.models import UserUpdate
from BackEnd.db import User_details
from BackEnd.db import Devicedata
from typing import List
from fastapi.responses import JSONResponse
# import jwt



# Setup CORS middleware
origins = ["*"]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.get("/users", response_model=List[User_Response])
def get_all_users():
    try:
        users = list(database['users'].find({}, {"_id": 0, "email": 1, "name": 1, "role": 1}))
        for user in users:
            user.setdefault('role', 'user')  # Add default role if missing

        # print("Users fetched:", users)  
        return users
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



@app.put("/users/{email}", response_model=User_Response)
def update_user_role(email: str, user_update: UserUpdate):
    try:
        result = database['users'].find_one_and_update(
            {"email": email},
            {"$set": {"role": user_update.role}},
            return_document=True  # Return the updated document
        )
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return result
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post("/signup")
def signup_user(user: User_Signup):
    try:
        print("Received data:", user)  # Debugging line
        findEmail = database['users'].find_one({'email': user.email})
        if findEmail is None:
            hashed_password = pwd_context.hash(user.password)
            database['users'].insert_one({'name': user.name, 'email': user.email, 'password': hashed_password, 'role': user.role})
            return {"message": "User created successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# Get login details (GET method for login)
@app.get("/signin/{email}")
async def get_login_user(email: str):
    try:
        data = database['users'].find_one({'email': email})
        if data:
            return {"email": data['email'], "name": data['name']}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/signin")
async def login_user(login_user: User_Login):
    try:
        data = database['users'].find_one({'email': login_user.email})
        if data:
            password_check = pwd_context.verify(login_user.password, data['password'])
            if password_check:
                token = await get_token(data)
                user_response = {
                    # "user_id": str(data['_id']),  # Convert ObjectId to string
                    "name": data['name'],
                    "email": data['email'],
                    "role": data['role'],
                }
                return {"message": "Login successful", "token": token, "user": user_response}
            else:
                return {"message": "Incorrect password"}
        else:
            return {"message": "User not found, please sign up"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.get("/forgotPassword/{email}")
async def forgot_password(email: str):
    user = database.users.find_one({"email": email})
    if user:
        return {"message": "User found, proceed to password reset"}
    else:
        return {"message": "User not found, please enter a valid email address"}




# Forgot password
@app.post("/forgotPassword")
async def forgot_password(new_credentials: User_Login):
    try:
        data = database['users'].find_one({'email': new_credentials.email})
        if data:
            password_check = pwd_context.verify(new_credentials.password, data['password'])
            if password_check:
                return {"message": "Entered password is same as old one, please enter a new one"}
            else:
                hashed_password = pwd_context.hash(new_credentials.password)
                database['users'].find_one_and_update({'email': new_credentials.email}, {"$set": {'password': hashed_password}})
                return {"message": "Password updated successfully"}
        else:
            return {"message": "User not found, please sign up"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    
@app.post("/resetPassword")
async def reset_password(request: ResetPasswordRequest):
    # Validate the password reset request
    user = database.users.find_one({"email": request.email})
    if user:
        # Check if the new password is different from the old one
        password_check = pwd_context.verify(request.newPassword, user['password'])
        if password_check:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail="New password cannot be the same as the old one"
            )
        
        # Hash the new password before saving it
        hashed_password = pwd_context.hash(request.newPassword)

        # Update the password in the database
        database.users.update_one({"email": request.email}, {"$set": {"password": hashed_password}})

        return {"message": "Password reset successful"}
    
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


# Dependency for JWT token verification
def verify_token():
    # Dummy function for token verification
    return {"role": "admin"}


# GET Route: Fetch unique Device_IDs
@app.get("/deviceids", response_class=JSONResponse)
async def get_device_ids(tokensss: dict = Depends(verify_token)):
    try:
        # Verify if user is admin
        user_role = tokensss.get("role", "user")
        if user_role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Insufficient permissions."
            )
        
        # Fetch unique Device IDs from the database
        device_ids = Devicedata.distinct("Device_Id")
        return JSONResponse(content=device_ids, status_code=200)
    except Exception as e:
        print("Error fetching device IDs:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch device IDs."
        )

# POST Route: Fetch Device Data for a specific Device ID
@app.post("/devicedata-fetch", response_class=JSONResponse)
async def fetch_device_data(request: Request, tokensss: dict = Depends(verify_token)):
    try:
        # Verify if user is admin
        user_role = tokensss.get("role", "user")
        if user_role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Insufficient permissions."
            )

        # Parse the request body for Device_ID
        data = await request.json()
        device_id = data.get("Device_ID")

        if not device_id:
            return JSONResponse(
                content={"error_message": "Device ID is required."},
                status_code=status.HTTP_400_BAD_REQUEST
            )

        # Query the database for the specific Device ID
        device_data = list(Devicedata.find({"Device_Id": int(device_id)}, {"_id": 0}))

        if not device_data:
            return JSONResponse(
                content={"error_message": "Device data not found."},
                status_code=status.HTTP_404_NOT_FOUND
            )

        return JSONResponse(content={"device_data": device_data}, status_code=200)
    except Exception as e:
        print(f"Error fetching data for Device ID: {e}")
        return JSONResponse(
            content={"error_message": "Failed to fetch device data."},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# GET Route: Fetch all device data (optional, for admin viewing all devices)
@app.get("/devicedata", response_class=JSONResponse)
async def get_all_device_data(tokensss: dict = Depends(verify_token)):
    try:
        # Verify if user is admin
        user_role = tokensss.get("role", "user")
        if user_role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Insufficient permissions."
            )
        
        # Fetch all device data
        data = list(Devicedata.find({}, {"_id": 0}))

        # Format data if necessary (optional step for cleaner response)
        formatted_data = [
            {
                "Device_ID": int(item.get("Device_Id", 0)),
                "Battery_Level": float(item.get("Battery_Level", 0)),
                "Sensor_Temperature": float(item.get("First_Sensor_temperature", 0)),
                "Route_From": str(item.get("Route_From", "N/A")),
                "Route_To": str(item.get("Route_To", "N/A")),
            }
            for item in data
        ]

        return JSONResponse(content=formatted_data, status_code=200)
    except Exception as e:
        print("Error fetching all device data:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch device data."
        )


@app.get("/myshipment")
def get_all_shipments(token: str = Depends(verify_token)):
    try:
        shipments = list(database['shipment_details'].find({}, {"_id": 0}))
        return shipments
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error retrieving the shipments")


@app.post("/newshipment")
def create_shipment(data: Shipment_Details, payload: dict = Depends(verify_token)):
    try:
        user_name = data.created_by

        # Check if shipment number already exists in the database
        existing_shipment = database['shipment_details'].find_one({"Shipment_Number": data.shipment_number})
        if existing_shipment:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Duplicate shipment number")

        # Insert shipment data into the database
        database['shipment_details'].insert_one({
            'Shipment_Number': data.shipment_number,
            'Container_Number': data.container_number,
            'PO_Number': data.po_number,
            'Delivery_Number': data.delivery_number,
            'NDC_Number': data.ndc_number,
            'Batch_Id': data.batch_id,
            'Serial_Number': data.serial_number,
            'Shipment_Description': data.shipment_description,
            'Route_Details': data.route_details,
            'Goods_Type': data.goods_type,
            'Device': data.device,
            'Expected_Delivery_Date': data.expected_delivery_date,
            'Created_By': user_name,
        })

        return {"message": "Shipment created successfully"}
    
    except HTTPException as e:
        raise e  # Raise custom HTTP exception for duplicate shipment number
    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error creating shipment")
