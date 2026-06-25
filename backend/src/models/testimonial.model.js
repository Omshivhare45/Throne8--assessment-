const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  clientRole: { type: String, trim: true },
  company:    { type: String, trim: true },
  avatar:     { type: String },
  review:     { type: String},
  rating:     { type: Number, min: 1, max: 5 },
  videoUrl:   { type: String, trim: true },
  approved:   { type: Boolean, default: false },
  featured:   { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);