const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const auth = require('../middleware/authMiddleware');

// This is host get all listing specific to host id ( Host route)
router.get('/my-listings', auth, async (req, res) => {
  try {
    if (req.user.role !== 'host') {
      return res.status(403).json({ message: 'Only hosts can access their listings' });
    }

    const listings = await Listing.find({ host: req.user._id });
    res.json(listings);
  } catch (err) {
    console.error('Error in /my-listings:', err);
    res.status(500).json({ error: 'Failed to fetch your listings' });
  }
});


// Get all listing( guest route)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'name email');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});


// Get lisitng details
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new listing
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'host') {
    return res.status(403).json({ message: 'Only hosts can create listings' });
  }

  const { title, location, pricePerNight, description, images, availableDates } = req.body;

  try {
    const newListing = new Listing({
      title,
      location,
      pricePerNight,
      description,
      images,
      availableDates,
      host: req.user._id
    });

    const saved = await newListing.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create listing', details: err.message });
  }
});

//update new listings
router.put('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (!listing.host.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//deletig the listings
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (!listing.host.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
