# Backend Deployment Guide for Vercel

## Prerequisites
- Vercel account
- MongoDB Atlas database
- Node.js project with dependencies

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Backend
```bash
cd backend
vercel
```

### 4. Set Environment Variables
In your Vercel dashboard, go to your project settings and add these environment variables:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `FRONTEND_URL`: Your frontend domain (e.g., https://your-app.vercel.app)

### 5. Update Frontend Configuration
After deployment, update your frontend's API base URL to point to your new backend URL.

## Important Notes

- Vercel will automatically assign a domain to your backend
- The backend will be serverless, so long-running connections aren't supported
- Make sure your MongoDB Atlas cluster allows connections from Vercel's IP ranges
- Update CORS settings if you encounter cross-origin issues

## Troubleshooting

- Check Vercel function logs for errors
- Ensure all environment variables are set correctly
- Verify MongoDB connection string and network access
