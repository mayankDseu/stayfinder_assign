const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  availableDates: [{ type: Date }]
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
