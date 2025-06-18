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
