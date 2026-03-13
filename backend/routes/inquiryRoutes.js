const express  = require('express');
const router   = express.Router();
const Inquiry  = require('../models/Inquiry');
const Listing  = require('../models/Listing');

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('listingId', 'title location price')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('listingId');
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST submit inquiry
router.post('/', async (req, res) => {
  try {
    const listing = await Listing.findById(req.body.listingId);
    if (!listing) return res.status(404).json({ success: false, message: 'Listing not found' });
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, message: 'Inquiry submitted', data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update inquiry status
router.put('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, message: 'Inquiry updated', data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;