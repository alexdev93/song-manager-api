# Stage 1: Build
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Run build script if applicable (e.g., if using TypeScript or a build step)
# RUN npm run build

# Stage 2: Production
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy only production dependencies and necessary files from the build stage
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app /usr/src/app

# Install only production dependencies (if not using multi-stage)
# COPY package*.json ./
# RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "start"]
