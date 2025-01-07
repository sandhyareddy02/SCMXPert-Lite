from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.responses import JSONResponse
from BackEnd.jwt import verify_token
from BackEnd.db import Devicedata
from pymongo.errors import PyMongoError
 
devicedata_route = APIRouter()
 
@devicedata_route.get("/deviceids", response_class=JSONResponse)
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
    except PyMongoError as db_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching the device id's from the database: {str(db_err)}"
        )
 
# POST Route: Fetch Device Data for a specific Device ID
@devicedata_route.post("/devicedata-fetch", response_class=JSONResponse)
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
    except PyMongoError as db_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching specific device id data from the database: {str(db_err)}"
        )
 
# GET Route: Fetch all device data (optional, for admin viewing all devices)
@devicedata_route.get("/devicedata", response_class=JSONResponse)
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
    except PyMongoError as db_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching all teh device data from the database: {str(db_err)}"
        )