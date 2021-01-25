const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  return res.send('App ready!');
});

module.exports = router;
