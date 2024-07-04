var express = require('express');
const { getAllMessage } = require('./controller');
var router = express.Router();

/* GET home page. */
router.get('/:roomId', getAllMessage);

module.exports = router;
