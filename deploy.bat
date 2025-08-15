@echo off
echo 🚀 URL Shortener Deployment Script
echo ====================================

echo.
echo 📋 Prerequisites Check:
echo - Make sure you have Git installed
echo - Make sure you have Node.js installed
echo - Make sure you have a GitHub account
echo - Make sure you have a MongoDB Atlas account
echo.

echo 🔧 Step 1: Prepare for Deployment
echo - Create a new GitHub repository
echo - Copy the repository URL
echo.

echo 🎯 Step 2: Deploy Backend to Railway
echo 1. Go to https://railway.app
echo 2. Sign in with GitHub
echo 3. Click "New Project"
echo 4. Select "Deploy from GitHub repo"
echo 5. Choose your backend repo
echo 6. Set environment variables:
echo    MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
echo    JWT_SECRET=your-super-secure-production-secret-key-here
echo    PORT=5000
echo    NODE_ENV=production
echo    FRONTEND_URL=https://your-frontend-domain.vercel.app
echo    BASE_URL=https://your-backend-domain.railway.app
echo.

echo 🌐 Step 3: Deploy Frontend to Vercel
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Click "New Project"
echo 4. Import your GitHub repo
echo 5. Set build settings:
echo    - Framework Preset: Vite
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo    - Install Command: npm install
echo 6. Add environment variable:
echo    VITE_API_BASE_URL=https://your-backend-domain.railway.app
echo 7. Deploy
echo.

echo 🔄 Step 4: Update Environment Variables
echo - Go back to Railway and update FRONTEND_URL with your Vercel domain
echo - Go back to Vercel and update VITE_API_BASE_URL with your Railway domain
echo.

echo 🧪 Step 5: Test Your Deployment
echo - Visit your Vercel URL
echo - Try creating a short URL
echo - Test registration and login
echo - Check if dashboard loads
echo.

echo 🆓 Free Tier Limits:
echo - Railway: $5 credit/month (enough for small apps)
echo - Vercel: 100GB bandwidth/month
echo - MongoDB Atlas: 512MB storage
echo.

echo 💰 Total Cost: $0/month! 🎉
echo.

echo 📚 For detailed instructions, see DEPLOYMENT.md
echo.

pause
