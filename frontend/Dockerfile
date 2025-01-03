# Use Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Install a static file server to serve React app
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the frontend
CMD ["serve", "-s", "build", "-l", "3000"]
