# import secrets
# from pymongo import MongoClient

# client = MongoClient('mongodb+srv://venatisandhya0810:zFApbIjXznu2WfnJ@cluster0.j8u06.mongodb.net/')

# mongodb = client.get_database('SCMXpertLite')


# SECRET_KEY = "MY_SECRET_KEY"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30


import os
import pymongo
import secrets
from dotenv import load_dotenv
from passlib.context import CryptContext

load_dotenv(dotenv_path=".env")
# load_dotenv(dotenv_path="../.env")


print(f"Mongo URI: {os.getenv('mongouri')}")
print(f"Database Name: {os.getenv('DB_NAME')}")

    
TITLE: str = "SCMXpertLite"
DESCRIPTION: str = """SCMXpertLite in FastAPI"""
PROJECT_VERSION: str = "1.0.0"
MONGODB_USER = os.getenv("mongodb_user")
MONGODB_PASSWORD = os.getenv("mongodb_password")

CLIENT = pymongo.MongoClient(os.getenv("mongouri"))
database = CLIENT[os.getenv("DB_NAME")]

Shipments=database['shipment_details']
User_details=database["users"]
Devicedata=database['Device_Data_Stream']


SECRET_KEY = "MY_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


