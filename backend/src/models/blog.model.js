const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    thumbnail: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['AI Trends', 'Development', 'Cybersecurity', 'Cloud', 'Company Updates', 'General',],
      default: 'General',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publishedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    }
  },
  { timestamps: true }
);





module.exports = mongoose.model('Blog', blogSchema);