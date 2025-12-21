# Stage 1: Build the Angular application
FROM node:20-alpine AS build
# create /app folder and cd /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
# Use RUN statement to execute npm code to install all dependencies
RUN npm install
# new folder called node_modules will be created (always big folder)

# Copy all application files
# COPY source(your host path) , destination(inside image), inour case 
# source . = current path
# destination . = /app  = $(pwd)
COPY . .

# Build the application with production configuration
# Replace 'your-app-name' with the actual output path found in your angular.json file
# The default path is usually 'dist/<project-name>/browser' in Angular 17+
RUN npm run build -- --configuration production --output-path=./dist/store-management-frontend

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the custom nginx configuration file from your project root to the container
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the build artifacts from the 'build' stage to the Nginx serving directory
COPY --from=build /app/dist/store-management-frontend/browser/ /usr/share/nginx/html/

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
