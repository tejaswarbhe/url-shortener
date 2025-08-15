# Backend Deployment Guide for Vercel

## ✅ **Issues Fixed**

- **Serverless Compatibility**: Updated server.js to work with Vercel's serverless environment
- **Database Connections**: Implemented proper MongoDB connection handling for serverless
- **Error Handling**: Added comprehensive error handling and health checks
- **CORS Configuration**: Updated to handle Vercel domains properly

## 🚀 **Deployment Steps**

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

### 5. Test Your Deployment
After deployment, test these endpoints:

- **Health Check**: `https://your-backend.vercel.app/health`
- **API Test**: `https://your-backend.vercel.app/api/test`
- **Root**: `https://your-backend.vercel.app/`

## 🔧 **What Was Fixed**

### **Serverless Compatibility**
- Removed `app.listen()` for production
- Added `module.exports = app` for Vercel
- Implemented per-request database connections

### **Database Handling**
- Connection pooling optimized for serverless
- Automatic reconnection handling
- Error handling for database failures

### **Error Prevention**
- Added health check endpoints
- Comprehensive error middleware
- 404 route handling

## 🚨 **Troubleshooting**

### **If you still get FUNCTION_INVOCATION_FAILED:**

1. **Check Environment Variables**:
   - Ensure `MONGO_URI` is set correctly
   - Verify `JWT_SECRET` is configured

2. **Test Health Endpoint**:
   - Visit `/health` to see if basic server is working
   - Check `/api/test` for API functionality

3. **Check Vercel Logs**:
   - Go to your Vercel dashboard
   - Check function logs for specific errors

4. **Database Connection**:
   - Ensure MongoDB Atlas allows connections from Vercel
   - Check if your MongoDB cluster is accessible

### **Common Issues & Solutions**

- **CORS Errors**: Frontend domain not in CORS origins
- **Database Timeout**: MongoDB connection string incorrect
- **Memory Issues**: Check Vercel function limits

## 📝 **Next Steps After Deployment**

1. **Update Frontend**: Point your frontend API calls to the new backend URL
2. **Test All Endpoints**: Verify authentication, URL shortening, etc.
3. **Monitor Logs**: Keep an eye on Vercel function logs
4. **Set Up Monitoring**: Consider adding error tracking

## 🔗 **Useful Links**

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [MongoDB Atlas Network Access](https://docs.atlas.mongodb.com/security-ip-access-list/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
