const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('hahha')
  res.send('respond with addddd resource');
});

module.exports = router;
