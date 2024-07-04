const Room = require('../room/model');
const User = require('../users/model');
const Message = require('./model');

module.exports = {
	getAllMessage: async (req, res, next) => {
		const { roomId } = req.params;

		const data = await Message.find({ roomId });
		res.status(200).json({ data: data });
	},
};
