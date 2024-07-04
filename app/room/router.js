var express = require('express');
const { joinRoom } = require('./controller');
var router = express.Router();

/* GET home page. */
router.post('/', joinRoom);

module.exports = router;
