# StayFinder 🏠

A full-stack web application inspired by Airbnb that allows users to list and book properties for short- or long-term stays. Built as part of an intern project to demonstrate full-stack development skills.

---


## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS (No Tailwind or UI library used)

### Backend
- Node.js
- Express.js
- JWT for authentication
- MongoDB with Mongoose

**HTTP Client**: Axios

📌 I chose this stack because it's lightweight, fast to build prototypes, and widely used in real-world production apps. React + Node are great for building scalable SPAs with full control over routing and API communication.

---

## 📦 Features Implemented

### 🔐 Authentication
- User Registration & Login with JWT
- Role-based protected routes (`host` and `guest`)

### 🏠 Listings
- Homepage with all listings (image, location, price)
- Listing detail page with calendar and description
- Host dashboard to create, edit, delete their listings

### 📅 Booking System
- Guests can book a listing with check-in/out dates
- Total price calculated
- Stored in MongoDB

### 💾 Seed Data
Seeder script (`seeder.js`) creates:
- Host and Guest user
- 3 sample listings
- 1 sample booking

Run it with:
```bash
node seeder.js

### 💻 Comfortable with Frontend + Backend?

Yes, I am comfortable working on both the frontend and backend.  
If given a UI design, I can implement it using React (or any other frontend tech if needed), and connect it to a secure backend using RESTful APIs.

### 💡 Two Unique Features to Improve Airbnb

1. **Last-Minute Deal Detector**: Auto-detect listings that are unsold and check-in is within 24–48 hours → trigger discounts and flash deals.

2. **Verified Neighborhood Vibe Score**: Use user reviews + AI summaries to assign a "Vibe Score" to areas (e.g., quiet, nightlife, family-friendly).

### 🔒 Security and Scalability

✅ **Security Measures**
- I will hash the passwords with bcrypt
- JWT tokens for protected routes
- Role-based access control (guest vs host)
- Input validation on both the side (backend + frontend)
- MongoDB injection prevention using Mongoose

📈 **Scalability Strategy**
- Can use MongoDB Atlas for horizontal scaling
- I will use CDN (e.g., Cloudflare) for static assets
- Split frontend/backend into separate deployable services (microservices)
- Use rate-limiting, logging, and monitoring tools (e.g., Winston + morgan + PM2)
