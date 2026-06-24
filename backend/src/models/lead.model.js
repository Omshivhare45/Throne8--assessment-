const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      enum: ['Under $5K', '$5K–$15K', '$15K–$50K', '$50K+', 'Not sure'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    source: {
      type: String,
      enum: ['contact', 'consultation', 'calculator', 'pricing'],
      default: 'contact',
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);