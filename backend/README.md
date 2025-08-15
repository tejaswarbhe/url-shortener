# URL Shortener Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/url-shortener

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Base URL for short links
BASE_URL=http://localhost:5000
```

### 3. Start MongoDB
Make sure MongoDB is running on your system. If you don't have MongoDB installed:
- Download from [MongoDB website](https://www.mongodb.com/try/download/community)
- Or use MongoDB Atlas (cloud service)

### 4. Run the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### URLs
- `POST /api/shorten` - Create a short URL
- `GET /:code` - Redirect to original URL

### Links
- `GET /api/links/my-links` - Get user's links (protected)

## Features
- User authentication with JWT
- URL shortening with unique codes
- Click tracking
- User-specific link management
- Secure password hashing
- CORS enabled for frontend integration

