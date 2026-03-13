const express = require('express');
const router  = express.Router();
const Listing = require('../models/Listing');

// GET all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: listings.length, data: listings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create listing
router.post('/', async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({ success: true, message: 'Listing created', data: listing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update listing
router.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.status(200).json({ success: true, message: 'Listing updated', data: listing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });
    res.status(200).json({ success: true, message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;