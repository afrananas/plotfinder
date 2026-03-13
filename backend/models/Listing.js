const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  location:  { type: String, required: true },
  price:     { type: Number, required: true },
  size:      { type: String, required: true },
  landUse:   { type: String, enum: ['Residential','Commercial','Agricultural'], default: 'Residential' },
  titleType: { type: String, default: 'C of O' },
  seller:    { type: String, required: true },
  status:    { type: String, enum: ['Active','Pending','Sold'], default: 'Pending' },
  verified:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);