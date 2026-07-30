const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Config = require('../models/Config');
const { generateVless } = require('../generator/vless');
const { generateReality } = require('../generator/reality');
const { generateTrojan } = require('../generator/trojan');
const { generateStormDNS } = require('../generator/stormdns');

// @route   POST /api/configs/generate
// @desc    Generate a new config
// @access  Private
router.post('/generate', auth, async (req, res) => {
  const { type, name, domain, port } = req.body;

  if (!type || !name) {
    return res.status(400).json({ msg: 'Type and name are required' });
  }

  try {
    let result;

    switch (type) {
      case 'vless':
        result = generateVless(domain, port);
        break;
      case 'reality':
        result = generateReality(domain);
        break;
      case 'trojan':
        result = generateTrojan(domain, port);
        break;
      case 'stormdns':
        result = generateStormDNS(domain);
        break;
      default:
        return res.status(400).json({ msg: 'Invalid config type' });
    }

    const config = new Config({
      name,
      type,
      link: result.link,
      configJson: result.config
    });

    await config.save();
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/configs
// @desc    Get all configs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const configs = await Config.find().sort({ createdAt: -1 });
    res.json(configs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/configs/:id
// @desc    Delete a config
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Config.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Config deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
