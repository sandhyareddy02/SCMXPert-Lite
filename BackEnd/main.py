
from fastapi import FastAPI, HTTPException, status, Depends, Request
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
    allow_origins=["http://localhost:3000"],
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

        print("Users fetched:", users)  # Log the users to see the response
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
# @app.post("/signin")
# async def login_user(login_user: User_Login):
#     try:
#         data = database['users'].find_one({'email': login_user.email})
#         if data:
#             password_check = pwd_context.verify(login_user.password, data['password'])
#             if password_check:
#                 token = await get_token(data)
#                 user_response = {"email": data['email'], "name": data['name']}
#                 return {"message": "Login successful", "token": token, "user": user_response}
#             else:
#                 return {"message": "Incorrect password"}
#         else:
#             return {"message": "User not found, please sign up"}
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

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


# @app.get("/forgotPassword/{email}")
# async def get_forgot_password(email: str):
#     try:
#         data = database['users'].find_one({'email': email})
#         if data:
#             return {"message": "Password reset initiated for user"}
#         else:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# @app.get("/forgotPassword/{email}")
# async def forgot_password(email: str):
#     user = database.users.find_one({"email": email})
#     if user:
#         return {"message": "User found, proceed to password reset"}
#     else:
#         return {"message": "User not found, please enter a valid email address"}

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

# GET route to fetch device data
# @app.get("/devicedata", response_class=JSONResponse)
# async def get_device_data(tokensss: dict = Depends(verify_token)):
#     try:
#         user_role = tokensss.get("role", "user")  # Retrieve user role from the token
#         if user_role != "admin":
#             raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied: Insufficient permissions.")
        
#         # Fetch device data stream from the database
#         data = list(Devicedata.find({}, {"_id": 0}))  # Exclude the '_id' field

#         # Process data into the expected format
#         formatted_data = [
#             {
#                 "Battery_Level": float(item.get("Battery_Level", 0)),
#                 "First_Sensor_Temperature": float(item.get("First_Sensor_temperature", 0)),
#                 "Device_ID": int(item.get("Device_Id", 0)),
#                 "Route_From": str(item.get("Route_From", "N/A")),
#                 "Route_To": str(item.get("Route_To", "N/A")),
#                 # "Timestamp": item.get("Timestamp", "N/A")
#             }
#             for item in data
#         ]
#         return JSONResponse(content=formatted_data, status_code=200)

#     except HTTPException as he:
#         raise he
#     except Exception as e:
#         print("Error fetching device data:", str(e))
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch device data.")

# @app.post("/devicedata-fetch", response_class=JSONResponse)
# async def fetch_device_data(request: Request, tokensss: dict = Depends(verify_token)):
#     try:
#         # Verify admin role
#         user_role = tokensss.get("role", "user")
#         if user_role != "admin":
#             raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access Denied: Insufficient permissions.")
        
#         # Parse the request body for Device_ID
#         data = await request.json()
#         device_id = data.get("Device_ID")

#         if not device_id:
#             return JSONResponse(content={"error_message": "Device ID is required."}, status_code=400)

#         # Query the database for the specific Device ID
#         device_data = list(Devicedata.find({"Device_Id": int(device_id)}, {"_id": 0}))
        
#         if not device_data:
#             return JSONResponse(content={"error_message": "Device data not found."}, status_code=404)

#         return JSONResponse(content={"device_data": device_data}, status_code=200)
    
#     except Exception as e:
#         print(f"Error fetching data for Device ID: {e}")
#         return JSONResponse(content={"error_message": str(e)}, status_code=500)



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






# # Get device data stream (with JWT verification)
# @app.get("/devicedata")
# async def get_device_data(tokensss: str = Depends(verify_token)):
#     try:
#         data = list(database['Device_Data_Stream'].find())
#         print("data",data)
#         return [{"Battery_Level": int(item["Battery_Level"]),
#                  "First_Sensor_Temperature": int(item["First_Sensor_Temperature"]),
#                  "Device_ID": str(item["Device_ID"]),
#                  "Route_From": str(item["Route_From"]),
#                  "Route_To": str(item["Route_To"])} for item in data]
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Can't get data")
    
# # POST Route to fetch device data by ID
# @app.post("/devicedata_by_id", response_model=List[dict])
# async def get_device_data_by_id(request: Device_Data, tokensss: str = Depends(verify_token)):
#     try:
#         data = list(Devicedata.find({"Device_ID": request.device_id}))
#         if not data:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No data found for this Device ID")
        
#         return [{"Device_ID": str(item["Device_ID"]),
#                  "Battery_Level": float(item["Battery_Level"]),
#                  "First_Sensor_Temperature": float(item["First_Sensor_Temperature"]),
#                  "Route_From": str(item["Route_From"]),
#                  "Route_To": str(item["Route_To"]),
#                  "Timestamp": item["Timestamp"].strftime("%Y-%m-%d %H:%M:%S")}
#                 for item in data]
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to fetch data")



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

# @app.post("/newshipment")
# def create_shipment(data: Shipment_Details, token: str = Depends(verify_token)):
#     try:

#         print("Token verified:", token)  # Log token payload
#         print("Inserting data into shipment_details collection...")  # Debug message
#         # Insert data into the correct collection
#         database['shipment_details'].insert_one({
#             'Shipment_Number': data.shipment_number,
#             'Container_Number': data.container_number,
#             'PO_Number': data.po_number,
#             'Delivery_Number': data.delivery_number,
#             'NDC_Number': data.ndc_number,
#             'Batch_Id': data.batch_id,
#             'Serial_Number': data.serial_number,
#             'Shipment_Description': data.shipment_description,
#             'Route_Details': data.route_details,
#             'Goods_Type': data.goods_type,
#             'Device': data.device,
#             'Expected_Delivery_Date': data.expected_delivery_date,
#         })
#         print("Data inserted successfully.")  # Confirmation message
#         return {"message": "Shipment created successfully"}
#     except Exception as e:
#         print("Exception occurred:", str(e))  # Log the exception
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))  # Include exception detail


# @app.post("/newshipment")
# def create_shipment(data: Shipment_Details, payload: dict = Depends(verify_token)):
#     try:
#         # Extract user information from the decoded payload
#         user_name = payload.get("username", "Unknown")

#         # Insert data into the database
#         database['shipment_details'].insert_one({
#             'Shipment_Number': data.shipment_number,
#             'Container_Number': data.container_number,
#             'PO_Number': data.po_number,
#             'Delivery_Number': data.delivery_number,
#             'NDC_Number': data.ndc_number,
#             'Batch_Id': data.batch_id,
#             'Serial_Number': data.serial_number,
#             'Shipment_Description': data.shipment_description,
#             'Route_Details': data.route_details,
#             'Goods_Type': data.goods_type,
#             'Device': data.device,
#             'Expected_Delivery_Date': data.expected_delivery_date,
#             'Created_By': data.created_by,  # Store the username who created the shipment
#         })

#         return {"message": "Shipment created successfully"}
    
#     except Exception as e:
#         print("Exception occurred:", str(e))  # Log the exception
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))



# @app.post("/newshipment")
# def create_shipment(data: Shipment_Details, payload: dict = Depends(verify_token)):
#     try:
#         print("data",type(data))
#         print("payload",payload)
#         # Extract username from the decoded token payload
#         user_name = data.created_by

#         # If user_name exists, fetch the full name from the user database (replace with your database query)
#         if user_name:
#             # Insert shipment data into the database
#             database['shipment_details'].insert_one({
#                 'Shipment_Number': data.shipment_number,
#                 'Container_Number': data.container_number,
#                 'PO_Number': data.po_number,
#                 'Delivery_Number': data.delivery_number,
#                 'NDC_Number': data.ndc_number,
#                 'Batch_Id': data.batch_id,
#                 'Serial_Number': data.serial_number,
#                 'Shipment_Description': data.shipment_description,
#                 'Route_Details': data.route_details,
#                 'Goods_Type': data.goods_type,
#                 'Device': data.device,
#                 'Expected_Delivery_Date': data.expected_delivery_date,
#                 'Created_By': user_name,  # Store the full name of the user who created the shipment
#             })

#         return {"message": "Shipment created successfully"}
    
#     except Exception as e:
#         print("Exception occurred:", str(e))  # Log the exception
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))


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
