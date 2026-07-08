const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech: {
    type: [String],
    default: [],
  },
  github: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'Globe',
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
