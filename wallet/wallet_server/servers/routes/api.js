const express = require('express');
const router = express.Router();
const config = require('../config/config');
const hostURI = config.development.host_metadata;


/*
 *  /api
 */
router.get('/', async (req, res, next) => {
  try {
    res.json({ message: "ok", data: 'a' });
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;