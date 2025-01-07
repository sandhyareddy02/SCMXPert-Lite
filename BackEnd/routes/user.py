from fastapi import APIRouter, HTTPException, status
from typing import List
from BackEnd.models import User_Response, UserUpdate
from BackEnd.db import database
from pymongo.errors import PyMongoError
 
user_route = APIRouter()
 
@user_route.get("/users", response_model=List[User_Response])
def get_all_users():
    try:
        users = list(database['users'].find({}, {"_id": 0, "email": 1, "name": 1, "role": 1}))
        for user in users:
            user.setdefault('role', 'user')
        return users
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching the users database: {str(db_error)}"
        )
 
@user_route.put("/users/{email}", response_model=User_Response)
def update_user_role(email: str, user_update: UserUpdate):
    try:
        result = database['users'].find_one_and_update(
            {"email": email},
            {"$set": {"role": user_update.role}},
            return_document=True  
        )
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return result
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating the users database: {str(db_error)}"
        )
 
@user_route.delete("/users/{email}", response_model=User_Response)
def delete_user(email: str):
    try:
        result = database['users'].find_one_and_delete({"email": email})
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return result
    except PyMongoError as db_error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error while deleting the user from the database: {str(db_error)}"
        )