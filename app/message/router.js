var express = require('express');
const { getAllMessage, addMessage } = require('./controller');
var router = express.Router();

/* GET home page. */
router.get('/:roomId', getAllMessage);
router.post('/:roomId', addMessage);

module.exports = router;
