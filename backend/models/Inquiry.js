const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  listingId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyerName:  { type: String, required: true },
  buyerEmail: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  message:    { type: String, default: '' },
  status:     { type: String, enum: ['Pending','Connected','Closed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);