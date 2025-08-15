# LinkifyX - URL Shortener Frontend

A modern, responsive React application for creating and managing short URLs.

## Features

- 🔐 User authentication (login/register)
- 🔗 Create short URLs from long URLs
- 📊 Dashboard to view your links and click counts
- 🎨 Beautiful glass morphism UI with Tailwind CSS
- 📱 Responsive design for all devices
- ⚡ Fast development with Vite
- 🔒 Protected routes for authenticated users

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Build Tool**: Vite

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── PrivateRoute.jsx # Route protection for auth users
│   ├── PublicRoute.jsx  # Route protection for non-auth users
│   └── Spinner.jsx     # Loading spinner
├── context/            # React Context for state management
│   ├── AuthContext.jsx # Authentication context
│   └── useAuth.js      # Custom hook for auth
├── pages/              # Page components
│   ├── HomePage.jsx    # URL shortening form
│   ├── LoginPage.jsx   # User login
│   ├── RegisterPage.jsx # User registration
│   └── DashboardPage.jsx # User dashboard
├── services/           # API service functions
│   ├── apiService.js   # URL shortening API
│   ├── authService.js  # Authentication API
│   └── linkService.js  # User links API
└── main.jsx           # Application entry point
```

## Environment Setup

The frontend is configured to proxy API requests to the backend at `http://localhost:5000`. Make sure your backend server is running.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Notes

- The app uses React Router for navigation
- Authentication state is managed through React Context
- API calls are proxied through Vite's proxy configuration
- Tailwind CSS provides utility-first styling
- Glass morphism design creates a modern, elegant UI
