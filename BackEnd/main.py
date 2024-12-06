
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from bson import ObjectId
from datetime import datetime
from BackEnd.models import User_Signup, User_Login, Device_Data, Shipment_Details, User_Response
from BackEnd.db import database  # Assuming you have a MongoDB connection setup
from BackEnd.jwt import verify_token, oauth2_scheme  # Import from jwt.py
# from datetime import datetime
from BackEnd.jwt import get_token




# Setup CORS middleware
origins = ["*"]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



# def admin_required(email: str):
#     """Checks if a user is an admin."""
#     user = database["users"].find_one({"email": email})
#     if not user or user.get("role") != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required"
#         )

# @app.get("/admin-only")
# def admin_only_route(token: str = Depends(verify_token)):
#     """An endpoint restricted to admins."""
#     email = token.get("sub")
#     admin_required(email)
#     return {"message": "Welcome, admin!"}


# Create user (signup)
# @app.get("/signup")
# def get_signup_user_info():
#     return {"message": "Use POST with user details to create a new user."}

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


# Get user details (GET method for retrieving user data)
# @app.get("/getUser/{email}")
# def get_user_details(email: str):
#     try:
#         user_data = database['users'].find_one({'email': email})
#         if user_data:
#             return {"name": user_data['name'], "email": user_data['email']}
#         else:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

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
    
# User login
@app.post("/signin")
async def login_user(login_user: User_Login):
    try:
        data = database['users'].find_one({'email': login_user.email})
        if data:
            password_check = pwd_context.verify(login_user.password, data['password'])
            if password_check:
                token = await get_token(data)
                user_response = {"email": data['email'], "name": data['name']}
                return {"message": "Login successful", "token": token, "user": user_response}
            else:
                return {"message": "Incorrect password"}
        else:
            return {"message": "User not found, please sign up"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@app.get("/forgotPassword/{email}")
async def get_forgot_password(email: str):
    try:
        data = database['users'].find_one({'email': email})
        if data:
            return {"message": "Password reset initiated for user"}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

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

# Get device data stream (with JWT verification)
@app.get("/devicedata")
async def get_device_data(tokensss: str = Depends(verify_token)):
    try:
        data = list(database['stream'].find())
        return [{"Battery_Level": int(item["Battery_Level"]),
                 "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
                 "Device_ID": str(item["Device_ID"]),
                 "Route_From": str(item["Route_From"]),
                 "Route_To": str(item["Route_To"])} for item in data]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can't get data")

# @app.get("/devicedata")
# async def get_device_data(tokensss: str = Depends(verify_token)):
#     try:
#         user_role = tokensss["role"]
#         if user_role != "admin":
#             raise HTTPException(status_code=403, detail="Access restricted: Admins only.")
#         data = list(database['stream'].find())
#         return [{"Battery_Level": int(item["Battery_Level"]),
#                  "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
#                  "Device_ID": str(item["Device_ID"]),
#                  "Route_From": str(item["Route_From"]),
#                  "Route_To": str(item["Route_To"]),
#                  "Timestamp": item["timestamp"],
#                  } for item in data]

#     except Exception as ex:
#         raise HTTPException(status_code=500, detail=f"{str(ex)}")

# async def get_device_data(tokensss: str = Depends(verify_token)):
#     print("ffffffffffffff",2+1)
    # logger.debug("Entering get_device_data function")  # Log entry point
    # try:
    #     user_role = tokensss["role"]
    #     logger.debug(f"User role: {user_role}")  # Log user role

    #     if user_role != "admin":
    #         logger.warning("Access denied: User is not an admin.")  # Log warning
    #         raise HTTPException(status_code=403, detail="Access restricted: Admins only.")

    #     # Fetch data from the database
    #     data = list(database['stream'].find())
    #     logger.info(f"Fetched data count: {len(data)}")  # Log data fetch count

    #     formatted_data = [{
    #         "Battery_Level": int(item["Battery_Level"]),
    #         "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
    #         "Device_ID": str(item["Device_ID"]),
    #         "Route_From": str(item["Route_From"]),
    #         "Route_To": str(item["Route_To"]),
    #         "Timestamp": item["timestamp"],
    #     } for item in data]

    #     logger.debug(f"Formatted data: {formatted_data}")  # Log formatted data
    #     return formatted_data

    # except Exception as ex:
    #     logger.error(f"Error fetching device data: {ex}", exc_info=True)  # Log exception with traceback
    #     raise HTTPException(status_code=500, detail=f"Error: {str(ex)}")


    
# @app.post("/devicedata")
# async def post_device_data(data: Device_Data, token: str = Depends(verify_token)):
#     try:
#         # Assuming Device_Data contains fields that should be inserted into 'stream' collection
#         database['stream'].insert_one({
#             'Battery_Level': data.Battery_Level,
#             'First_Sensor_Temperature': data.First_Sensor_Temperature,
#             'Device_ID': data.Device_ID,
#             'Route_From': data.Route_From,
#             'Route_To': data.Route_To
#         })
#         return {"message": "Data stream created successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error creating data stream")

# Get shipment details (GET method for retrieving shipment data)
# @app.get("/myshipment/{shipment_number}")
# def get_shipment_details(shipment_number: str, token: str = Depends(verify_token)):
#     try:
#         shipment_data = database['shipment_created'].find_one({'Shipment_Number': shipment_number})
#         if shipment_data:
#             return shipment_data
#         else:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Shipment not found")
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error retrieving shipment details")

@app.get("/myshipment")
def get_all_shipments(token: str = Depends(verify_token)):
    try:
        shipments = list(database['shipment_details'].find({}, {"_id": 0}))
        return shipments
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error retrieving the shipments")

@app.post("/newshipment")
def create_shipment(data: Shipment_Details, token: str = Depends(verify_token)):
    try:
        print("Token verified:", token)  # Log token payload
        print("Inserting data into shipment_details collection...")  # Debug message
        # Insert data into the correct collection
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
            'Expected_Delivery_Date': data.expected_delivery_date
        })
        print("Data inserted successfully.")  # Confirmation message
        return {"message": "Shipment created successfully"}
    except Exception as e:
        print("Exception occurred:", str(e))  # Log the exception
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))  # Include exception detail



