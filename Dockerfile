# Use Node.js version 20 as the base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port used by your app
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]

