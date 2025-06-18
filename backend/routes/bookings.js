const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const auth = require('../middleware/authMiddleware');

// POST a booking
router.post('/', auth, async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * listing.pricePerNight;

    const booking = new Booking({
      listing: listing._id,
      guest: req.user._id,
      checkIn,
      checkOut,
      totalPrice
    });

    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Booking failed', details: err.message });
  }
});

module.exports = router;
