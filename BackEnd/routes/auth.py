from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext
from BackEnd.models import User_Signup, User_Login, ResetPasswordRequest
from BackEnd.db import database
from BackEnd.jwt import get_token
from pymongo.errors import PyMongoError
 
auth_route = APIRouter()
 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
 
@auth_route.post("/signup")
def signup_user(user: User_Signup):
    try:
        findEmail = database['users'].find_one({'email': user.email})
        if findEmail is None:
            hashed_password = pwd_context.hash(user.password)
            database['users'].insert_one({'name': user.name, 'email': user.email, 'password': hashed_password, 'role': user.role})
            return {"message": "User created successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while creating the user: {str(db_error)}"
        )
 
# Get login details (GET method for login)
@auth_route.get("/signin/{email}")
async def get_login_user(email: str):
    try:
        data = database['users'].find_one({'email': email})
        if data:
            return {"email": data['email'], "name": data['name']}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while finding in database: {str(db_error)}"
        )
 
@auth_route.post("/signin")
async def login_user(login_user: User_Login):
    try:
        data = database['users'].find_one({'email': login_user.email})
        if data:
            password_check = pwd_context.verify(login_user.password, data['password'])
            if password_check:
                token = await get_token(data)
                user_response = {
                    "name": data['name'],
                    "email": data['email'],
                    "role": data['role'],
                }
                return {"message": "Login successful", "token": token, "user": user_response}
            else:
                return {"message": "Incorrect password"}
        else:
            return {"message": "User not found, please sign up"}
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while sign in: {str(db_error)}"
        )
 
@auth_route.get("/forgotPassword/{email}")
async def forgot_password(email: str):
    user = database.users.find_one({"email": email})
    if user:
        return {"message": "User found, proceed to password reset"}
    else:
        return {"message": "User not found, please enter a valid email address"}
 
# Forgot password
@auth_route.post("/forgotPassword")
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
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error the user doesn't found in teh database: {str(db_error)}"
        )
   
@auth_route.post("/resetPassword")
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