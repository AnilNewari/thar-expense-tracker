const express = require('express');
const router = express.Router();
const Business = require('../models/business');

router.get('/', async (req, res) => {
  const data = await Business.find();
  res.json(data);
});

router.post('/', async (req, res) => {
  const newBusiness = new Business(req.body);
  const saved = await newBusiness.save();
  res.json(saved);
});

module.exports = router;
