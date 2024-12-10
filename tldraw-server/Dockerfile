# Use a Node.js image
FROM node:23-alpine3.20

# Set up working directory and permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy only the package.json and lock file to install dependencies
COPY --chown=node:node package*.json ./

# Switch to a non-root user
USER node

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY --chown=node:node . .

EXPOSE 5858

# Command to start your server
CMD ["npm", "run", "start"]

