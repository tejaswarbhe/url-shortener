# LinkifyX - URL Shortener

A full-stack URL shortening application built with React, Node.js, and MongoDB.

## 🚀 Features

- **URL Shortening**: Convert long URLs to short, shareable links
- **User Authentication**: Secure login/register system with JWT
- **Dashboard**: View and manage your shortened URLs
- **Click Tracking**: Monitor how many times your links are clicked
- **Modern UI**: Beautiful glass morphism design with Tailwind CSS
- **Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Context API

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## 📁 Project Structure

```
URL/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Authentication context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   └── README.md
├── backend/            # Node.js backend API
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth & error middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── config/         # Database configuration
│   ├── server.js       # Express server
│   ├── package.json
│   └── README.md
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd URL
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file (see backend/README.md for details)
# Start MongoDB service
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000



## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### URLs
- `POST /api/shorten` - Create short URL
- `GET /:code` - Redirect to original URL

### Links
- `GET /api/links/my-links` - Get user's links (protected)

## 🎨 UI Components

- **Glass Cards**: Modern glass morphism design
- **Responsive Navigation**: Mobile-friendly navbar
- **Form Components**: Styled input fields and buttons
- **Loading States**: Spinner components for better UX
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS configuration
- Input validation
- Error handling middleware

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)
```bash
cd backend
npm start
# Set environment variables in deployment platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Tejas Warbhe** - Full Stack Developer

---

Built with ❤️ using modern web technologies

