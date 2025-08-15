# 🚀 Free Deployment Guide - Vercel + Railway

## 📋 Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account (free)
- Railway account (free)

## 🔧 Step 1: Prepare MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Get connection string
6. Add your IP to whitelist

## 🎯 Step 2: Deploy Backend to Railway (Free)

### 2.1 Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/url-shortener-backend.git
git push -u origin main
```

### 2.2 Deploy to Railway
1. Go to [Railway](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your backend repo
6. Railway will auto-detect Node.js

### 2.3 Set Environment Variables in Railway
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
JWT_SECRET=your-super-secure-production-secret-key-here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
BASE_URL=https://your-backend-domain.railway.app
```

### 2.4 Get Your Backend URL
- Railway will give you a URL like: `https://your-app.railway.app`
- Copy this URL for the next step

## 🌐 Step 3: Deploy Frontend to Vercel (Free)

### 3.1 Update API Base URL
Update your frontend services to use the production backend URL:

**File: `backend/client/src/services/apiService.js`**
```javascript
// Replace the relative URL with your Railway backend URL
const API_BASE_URL = 'https://your-backend-domain.railway.app';

export const createShortUrl = async (longUrl) => {
  try {
    const token = localStorage.getItem('token');
    const headers = token
      ? { Authorization: `Bearer ${token}` }
      : undefined;
    
    // Use absolute URL for production
    const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl }, { headers });
    return response.data.data;
  } catch (error) {
    // ... error handling
  }
};
```

**File: `backend/client/src/services/authService.js`**
```javascript
const API_BASE_URL = 'https://your-backend-domain.railway.app';
const API_URL = `${API_BASE_URL}/api/auth/`;
```

**File: `backend/client/src/services/linkService.js`**
```javascript
const API_BASE_URL = 'https://your-backend-domain.railway.app';
const API_URL = `${API_BASE_URL}/api/links/`;
```

### 3.2 Build and Deploy to Vercel
```bash
cd backend/client
npm run build
```

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repo
5. Set build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Deploy

### 3.3 Get Your Frontend URL
- Vercel will give you a URL like: `https://your-app.vercel.app`
- Copy this URL

## 🔄 Step 4: Update Environment Variables

### 4.1 Update Railway Backend
Go back to Railway and update:
```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
BASE_URL=https://your-backend-domain.railway.app
```

### 4.2 Update Vercel Frontend
In Vercel dashboard, add environment variables:
```env
VITE_API_BASE_URL=https://your-backend-domain.railway.app
```

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend API
```bash
# Test URL shortening
curl -X POST https://your-backend-domain.railway.app/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl":"https://example.com"}'

# Test registration
curl -X POST https://your-backend-domain.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### 5.2 Test Frontend
- Visit your Vercel URL
- Try creating a short URL
- Test registration and login
- Check if dashboard loads

## 🆓 Free Tier Limits

### Railway (Backend)
- $5 credit/month (enough for small apps)
- Auto-sleeps after inactivity
- 500 hours/month

### Vercel (Frontend)
- 100GB bandwidth/month
- Unlimited deployments
- Custom domains supported

### MongoDB Atlas
- 512MB storage
- Shared clusters
- Perfect for development

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check `FRONTEND_URL` in Railway
   - Ensure it matches your Vercel domain exactly

2. **MongoDB Connection Failed**
   - Verify connection string
   - Check IP whitelist in Atlas
   - Ensure username/password are correct

3. **Build Failed in Vercel**
   - Check build command
   - Verify output directory
   - Check for missing dependencies

4. **API Calls Fail**
   - Verify backend URL in frontend services
   - Check if Railway app is running
   - Test API endpoints directly

## 🚀 Next Steps

1. **Custom Domain**: Add your own domain to Vercel
2. **SSL**: Automatic with both platforms
3. **Monitoring**: Set up Railway and Vercel analytics
4. **Backup**: Regular database backups
5. **Scaling**: Upgrade when you hit limits

## 💰 Cost Breakdown
- **MongoDB Atlas**: $0/month (free tier)
- **Railway**: $0/month (free credit)
- **Vercel**: $0/month (free tier)
- **Total**: $0/month! 🎉

Your URL shortener will be live and completely free!
