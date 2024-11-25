from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId

# Secret key for encoding and decoding JWT tokens
ALGORITHM = "HS256"
SECRET_KEY = "MY_SECRET_KEY"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="loginUser")

def convert_objectid(obj):
    if isinstance(obj, dict):
        return {k: convert_objectid(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(v) for v in obj]
    elif isinstance(obj, ObjectId):
        return str(obj)
    return obj


# Function to create a JWT token
def create_access_token(data: dict):
    user_data = convert_objectid(data)  # Convert ObjectId to string
    to_encode = user_data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)  # Token expiration time
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Generate token for the user data
async def get_token(data):
    token = create_access_token(data)
    return {"access_token": token, "token_type": "bearer"}

# Verify the JWT token
async def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired or invalid",
        )

