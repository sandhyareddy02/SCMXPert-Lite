from pydantic import BaseModel, EmailStr
from datetime import datetime
from bson import ObjectId

# Helper function to convert ObjectId to string
def objectid_to_str(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError(f"Object of type {type(obj)} is not supported")

class User_Signup(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class User_Login(BaseModel):
    email: EmailStr
    password: str

class Device_Data(BaseModel):
    device_id: int
    battery_level: float
    first_sensor_temperature: float
    route_from: str
    route_to: str

class Shipment_Details(BaseModel):
    shipment_number: int
    container_number: int
    route_details: str
    goods_type: str
    device: int
    expected_delivery_date: str
    po_number: int
    delivery_number: int
    ndc_number: int
    batch_id: int
    serial_number: int
    shipment_description: str
    created_by: str
    
class User_Response(BaseModel):
    email: str
    name: str
    role: str

class UserUpdate(BaseModel):
    role: str

class ResetPasswordRequest(BaseModel):
    email: str
    newPassword: str
    confirmPassword: str