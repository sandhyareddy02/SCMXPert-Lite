from fastapi import APIRouter, Depends, HTTPException, status
from BackEnd.jwt import verify_token
from BackEnd.models import Shipment_Details
from BackEnd.db import database
from pymongo.errors import DuplicateKeyError, PyMongoError
 
shipment_route = APIRouter()
 
@shipment_route.get("/myshipment")
def get_all_shipments(token: str = Depends(verify_token)):
    try:
        shipments = list(database['shipment_details'].find({}, {"_id": 0}))
        return shipments
    except PyMongoError as db_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching the shipment data from the database: {str(db_err)}"
        )
 
@shipment_route.post("/newshipment")
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
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate shipment number. Please use a unique number."
        )
    except PyMongoError as db_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating the shipment data to the database: {str(db_err)}"
        )