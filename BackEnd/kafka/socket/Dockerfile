# Use the official Python runtime as a parent image
FROM python:3.12.7
 
# Set the working directory to /app
WORKDIR /BackEnd/kafka/socket
 
# Install any needed packages specified in requirements.txt
RUN pip install confluent-kafka
 
# Copy the rest of the application code into the container at /app
COPY . /BackEnd/kafka/socket
 
# Expose port 80 for the FastAPI app to listen on
EXPOSE 12345
 
# Define the command to run your FastAPI application when the container starts
CMD ["python", "server.py"]