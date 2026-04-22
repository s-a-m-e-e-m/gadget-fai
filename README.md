# 🔧 GadgetHub - Gadget Recommendation Platform

A full-stack web application for discovering, reviewing, and recommending the latest tech gadgets. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## 🌟 Features

### User Features
- ✅ User authentication with JWT
- ✅ Browse and search gadgets
- ✅ Filter gadgets by category, price, rating
- ✅ Read detailed gadget specifications
- ✅ Write and share recommendations
- ✅ Like and comment on reviews
- ✅ View user profiles and activity
- ✅ Trending recommendations
- ✅ Mobile-responsive design

### Admin Features
- ✅ Add, edit, delete gadgets
- ✅ Manage categories
- ✅ View platform statistics
- ✅ Monitor user activity
- ✅ Seed database with initial data

## 📊 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
unknownproject/
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components (8 pages)
│   │   ├── components/      # Reusable components (7 components)
│   │   ├── context/         # Global state (GadgetContext)
│   │   ├── auth/            # Auth components
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── models/          # Mongoose schemas (4 models)
    │   ├── controllers/     # Business logic (4 controllers)
    │   ├── routes/          # API routes (5 route files)
    │   ├── middleware/      # Auth middleware
    │   ├── seeds/           # Database seeding
    │   ├── app.js           # Express app
    │   └── db.js            # MongoDB connection
    ├── index.js             # Server entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo 'MONGO_DB_URL=mongodb://localhost:27017/gadgethub' > .env
echo 'JWT_SECRET_KEY=your_secret_key_here' >> .env

# Start server
npm start
# Server runs on http://localhost:3000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# App runs on http://localhost:5173
```

### 3. Seed Database

1. Sign up via the frontend
2. Make a POST request to seed the database:
```bash
curl -X POST http://localhost:3000/api/admin/seed-data \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Key Endpoints

#### Gadgets
- `GET /gadgets` - Get all gadgets with filters
- `GET /gadgets/search?q=query` - Search gadgets
- `GET /gadgets/:id` - Get gadget details
- `GET /gadgets/featured` - Get featured gadgets
- `GET /gadgets/category?category=name` - Get by category

#### Recommendations
- `GET /recommendations` - Get all recommendations
- `GET /recommendations/gadget/:id` - Get reviews for gadget
- `POST /recommendations` - Create review (auth required)
- `PUT /recommendations/:id/like` - Like review (auth required)

#### Authentication
- `POST /user/signup` - Register
- `POST /user/signin` - Login
- `GET /user/profile` - Get profile (auth required)
- `DELETE /user/logout` - Logout

#### Statistics
- `GET /stats/platform` - Platform statistics
- `GET /stats/gadgets` - Gadget statistics
- `GET /stats/recommendations` - Review statistics

Full API documentation: See [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)

## 🎯 Pages & Routes

### Frontend Pages
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with featured gadgets |
| `/gadgets` | Gadgets | Browse all gadgets with filters |
| `/gadget/:id` | GadgetDetail | Detailed gadget view |
| `/recommendations` | Recommendations | All user recommendations |
| `/create-recommendation` | CreateRecommendation | Write review form |
| `/profile` | UserProfile | User profile |
| `/categories/:name` | Categories | Browse by category |
| `/about` | About | About platform |
| `/signin` | Signin | Login page |
| `/signup` | Signup | Register page |

## 🗄️ Database Models

### User
```
- name (String)
- email (String, unique)
- password (String, hashed)
- profilePic (String)
- createdAt, updatedAt
```

### Gadget
```
- name, description
- category (enum: 8 types)
- price (Number)
- image, rating, reviews
- specs (Map)
- createdBy (reference to User)
- isActive, createdAt, updatedAt
```

### Recommendation
```
- gadgetId (reference to Gadget)
- userId (reference to User)
- title, description
- rating (1-5), category
- likes, likedBy (array)
- comments (array with nested structure)
- verified, createdAt, updatedAt
```

### Category
```
- name (unique, enum: 8 categories)
- icon, description
- gadgetCount
- createdAt, updatedAt
```

## 🔐 Authentication

- **Method:** JWT with HTTP-only cookies
- **Expiration:** 7 days
- **Protected routes:** Require valid token
- **Password:** Bcrypted with salt rounds = 10

## 📊 Sample Data

### 8 Gadgets
1. iPhone 15 Pro Max - $1199
2. Samsung Galaxy S24 - $999
3. iPad Pro 12.9 - $1099
4. Sony WH-1000XM5 - $399
5. MacBook Pro 16 - $2499
6. Apple Watch Series 9 - $399
7. DJI Air 3S - $749
8. Logitech MX Master 3S - $99

### 8 Categories
- Smartphones, Laptops, Tablets
- Headphones, Wearables, Accessories
- Drones, Gaming

## 🧪 Testing

### Using cURL
```bash
# Sign up
curl -X POST http://localhost:3000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Get gadgets
curl http://localhost:3000/api/gadgets

# Search
curl "http://localhost:3000/api/gadgets/search?q=iPhone"
```

### Using Postman
1. Import API collection
2. Set up environment variables
3. Test endpoints with collections

## 🎨 UI Components

### Page Components (8)
- Home, Gadgets, GadgetDetail
- Recommendations, CreateRecommendation
- UserProfile, Categories, About

### Reusable Components (7)
- GadgetCard - Display gadgets
- RecommendationCard - Show reviews
- Rating - Star rating
- SearchBar - Search functionality
- GadgetFilter - Apply filters
- Navbar - Navigation
- Footer - Footer

## 📈 Statistics

- **Models:** 4 (User, Gadget, Recommendation, Category)
- **Controllers:** 4 (user, gadget, recommendation, stats)
- **Routes:** 5 route files
- **API Endpoints:** 35+ endpoints
- **Pages:** 8 pages
- **Components:** 7+ components
- **Database Collections:** 4
- **Features:** 20+

## 🚦 Status

✅ **Completed**
- User authentication & authorization
- Gadget CRUD operations
- Recommendation system
- Search & filtering
- Statistics & analytics
- Responsive frontend
- API integration
- Database seeding

⏳ **Future Enhancements**
- Email verification
- Password reset
- Image upload
- Advanced search (Elasticsearch)
- Email notifications
- Wishlist feature
- Gadget comparison
- Admin dashboard
- Rate limiting
- Caching (Redis)

## 📝 Environment Variables

### Backend (.env)
```
MONGO_DB_URL=mongodb://localhost:27017/gadgethub
JWT_SECRET_KEY=your_super_secret_key
NODE_ENV=development
```

### Frontend
- API base URL: `http://localhost:3000/api`
- Configured in `src/utils/links.js`

## 🐛 Troubleshooting

### MongoDB Connection
- Ensure MongoDB is running
- Check connection string
- Verify credentials (for Atlas)

### CORS Errors
- Frontend runs on port 5173
- Backend runs on port 3000
- Both servers must be running

### Authentication Issues
- Clear cookies and try again
- Check JWT_SECRET_KEY matches
- Verify token in requests

### Port Already in Use
- Change ports in configuration
- Or kill process using the port

## 📖 Documentation

- **API Docs:** [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)
- **Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Frontend Structure:** [FRONTEND_STRUCTURE.md](./frontend/FRONTEND_STRUCTURE.md)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

ISC License

## 👨‍💻 Author

GadgetHub Team - April 2026

## 🔗 Links

- GitHub: [repository-link]
- Live Demo: [demo-link]
- API Documentation: See `/backend/API_DOCUMENTATION.md`

---

## 🎯 Next Steps

1. ✅ Clone the repository
2. ✅ Follow Quick Start guide
3. ✅ Seed the database
4. ✅ Explore the app
5. ✅ Create your first recommendation
6. ✅ Check out statistics
7. ✅ Contribute new features

---

**Made with ❤️ for tech enthusiasts**

Last Updated: April 22, 2026
