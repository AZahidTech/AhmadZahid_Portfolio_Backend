const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  icon: {
    type: String,
    default: 'Globe',
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
