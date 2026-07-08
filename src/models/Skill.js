const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  icon: {
    type: String,
    default: 'Globe',
  },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
