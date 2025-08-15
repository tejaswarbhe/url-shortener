# ⚡ Quick Deploy - Get Live in 10 Minutes!

## 🚀 Super Fast Deployment

### 1. **Create GitHub Repo** (2 min)
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git
git push -u origin main
```

### 2. **Deploy Backend to Railway** (3 min)
1. Go to [Railway](https://railway.app) → Sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add environment variables:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
   JWT_SECRET=your-secret-key-123
   NODE_ENV=production
   ```
5. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### 3. **Deploy Frontend to Vercel** (3 min)
1. Go to [Vercel](https://vercel.com) → Sign in with GitHub
2. Click "New Project" → Import your repo
3. Set build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```env
   VITE_API_BASE_URL=https://your-app.railway.app
   ```
5. Deploy and copy your Vercel URL

### 4. **Update Environment Variables** (2 min)
- Go back to Railway → Update `FRONTEND_URL` with your Vercel domain
- Go back to Vercel → Update `VITE_API_BASE_URL` with your Railway domain

## 🎯 That's It! Your app is live!

**Frontend**: `https://your-app.vercel.app`  
**Backend**: `https://your-app.railway.app`

## 🧪 Test It
- Visit your Vercel URL
- Create a short URL
- Register and login
- Check dashboard

## 💰 Cost: $0/month forever!

---

**Need help?** See `DEPLOYMENT.md` for detailed instructions.
