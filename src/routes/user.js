var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  return res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile', function (req, res, next) {
  console.log('work', req.user);
  return res.send(req.user);
});

module.exports = router;
