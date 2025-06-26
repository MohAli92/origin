# Share Dish Project 🍽️

A food sharing platform built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd share-dish-project-main
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   **Server (.env in server folder):**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   FRONTEND_URL=https://your-codespace-url-3000.app.github.dev
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

   **Client (.env in client folder):**
   ```env
   REACT_APP_API_URL=https://your-codespace-url-5000.app.github.dev
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend client (port 3000).

## 🏗️ Project Structure

```
share-dish-project-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── package.json
└── package.json            # Root package.json
```

## 🔧 Available Scripts

- `npm run install-all` - Install dependencies for all packages
- `npm run dev` - Start both server and client in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend client
- `npm run build` - Build the client for production

## 🌐 CodeSpace Setup

When running on GitHub CodeSpace:

1. **Ports Configuration:**
   - Backend: Port 5000
   - Frontend: Port 3000

2. **Environment Variables:**
   - Update `FRONTEND_URL` in server/.env with your CodeSpace frontend URL
   - Update `REACT_APP_API_URL` in client/.env with your CodeSpace backend URL

3. **CORS Configuration:**
   - The server is configured to accept requests from CodeSpace URLs
   - Socket.IO is configured for real-time messaging

## 🔐 Authentication

- Firebase Authentication for user management
- JWT tokens for API authentication
- Protected routes on both frontend and backend

## 📱 Features

- User registration and authentication
- Create and manage food posts
- Real-time messaging between users
- Image upload with Cloudinary
- Responsive design with Material-UI

## 🛠️ Technologies Used

### Frontend
- React 18
- TypeScript
- Material-UI
- Socket.IO Client
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- Cloudinary
- JWT Authentication

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository. 