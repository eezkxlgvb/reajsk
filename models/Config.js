const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['vless', 'reality', 'trojan', 'stormdns'],
    required: true
  },
  link: {
    type: String,
    required: true
  },
  configJson: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Config', ConfigSchema);
