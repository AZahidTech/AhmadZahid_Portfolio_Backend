const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  points: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
