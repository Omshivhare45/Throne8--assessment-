const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name:    { type: String, required: [true, 'Name is required'], trim: true },
  email:   { type: String, required: [true, 'Email is required'], trim: true, lowercase: true,
             match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] },
  phone:   { type: String, trim: true },
  company: { type: String, trim: true },
  budget:  { type: String },
  message: { type: String, required: [true, 'Message is required'], maxlength: 2000 },
  source:  { type: String, enum: ['contact', 'consultation', 'calculator', 'pricing'], default: 'contact' },
  status:  { type: String, enum: ['new', 'read', 'replied', 'converted', 'closed'], default: 'new' },
  adminNote: { type: String },
}, { timestamps: true });

leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);