from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from BackEnd.routes.user import user_route
from BackEnd.routes.auth import auth_route
from BackEnd.routes.devicedata import devicedata_route
from BackEnd.routes.shipment import shipment_route
 
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
 
app.include_router(user_route, prefix="/users")
app.include_router(auth_route, prefix="/auth")
app.include_router(devicedata_route, prefix="/devicedata")
app.include_router(shipment_route, prefix="/shipment")