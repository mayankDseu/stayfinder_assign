
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

app.use('/api/bookings', bookingRoutes);

// Connecting  DB and starting the  server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('DB connection error:', err));
