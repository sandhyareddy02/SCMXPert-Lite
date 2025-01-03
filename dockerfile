# Use Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /BackEnd  

#Copy backend files
COPY . .

# Install dependencies
# RUN pip install --no-cache-dir -r requirements.txt 
RUN pip install --trusted-host pypi.python.org -r requirements.txt python-dotenv

# Expose port 8000 for FastAPI
EXPOSE 8000

# Command to run the backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
