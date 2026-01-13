# GigFlow

A full-stack freelance marketplace platform built with the MERN stack, allowing users to buy and sell services (gigs) seamlessly.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Dual User Roles**: 
  - Sellers can create and manage gigs
  - Buyers can browse and purchase services
- **Gig Management**: Create, edit, and delete service listings
- **Order System**: Complete order workflow from purchase to completion
- **Real-time Updates**: State management with Redux Toolkit
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Search & Filter**: Easy discovery of services

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Akshay0835/GigFlow.git
cd GigFlow
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (if needed)
touch .env
```

Add the following to your frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
GigFlow/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Gig.js             # Gig model
│   │   └── Order.js           # Order model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── gigs.js            # Gig routes
│   │   └── orders.js          # Order routes
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   └── Footer.jsx     # Footer component
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   ├── Gigs.jsx       # Browse gigs
│   │   │   ├── GigDetail.jsx  # Gig details
│   │   │   ├── CreateGig.jsx  # Create new gig
│   │   │   ├── MyGigs.jsx     # Manage user gigs
│   │   │   └── Orders.jsx     # Order management
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── gigSlice.js
│   │   │   │   └── orderSlice.js
│   │   │   └── store.js       # Redux store configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Gigs
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create gig (Auth required)
- `PUT /api/gigs/:id` - Update gig (Auth required)
- `DELETE /api/gigs/:id` - Delete gig (Auth required)

### Orders
- `GET /api/orders` - Get user orders (Auth required)
- `POST /api/orders` - Create order (Auth required)

## 🎯 Usage

1. **Register**: Create an account as a buyer or seller
2. **Browse Gigs**: Explore available services
3. **Create Gig**: If you're a seller, list your services
4. **Place Order**: Purchase services from sellers
5. **Manage**: Track your orders and gigs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Akshay Partap Singh**

- GitHub: [@Akshay0835](https://github.com/Akshay0835)

## 🙏 Acknowledgments

- Inspired by popular freelance platforms
- Built with modern web technologies
- Thanks to the open-source community

## 📧 Contact

For any queries or suggestions, please reach out:
- Create an issue in the repository
- Email: your.email@example.com

---

⭐ Star this repository if you find it helpful!
