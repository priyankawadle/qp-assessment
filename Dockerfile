# Use an official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Set environment variables (update these based on your configuration)
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=yourpassword
ENV DB_NAME=grocery_booking
ENV JWT_SECRET=yourjwtsecret

# Define the command to start the application
CMD ["npm", "start"]
