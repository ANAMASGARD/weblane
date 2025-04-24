# --------- Build Frontend ---------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --------- Build Backend ---------
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm install
COPY backend/ ./
# Add a check for route syntax issues
RUN echo "Validating route syntax..."

# --------- Final Stage ---------
FROM node:20-alpine
WORKDIR /app

# Copy backend including node_modules to ensure all dependencies are available
COPY --from=backend-build /app/backend /app/backend

# Copy frontend build to backend's public directory
COPY --from=frontend-build /app/frontend/dist /app/backend/public

# Set environment variables (optional, can also be set in Cloud Run)
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port Cloud Run expects
EXPOSE 8080

# Start the backend with additional debugging for path-to-regexp
ENV DEBUG=path-to-regexp
CMD ["node", "backend/src/index.js"]