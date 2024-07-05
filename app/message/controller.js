const Room = require('../room/model');
const User = require('../users/model');
const Message = require('./model');

module.exports = {
	getAllMessage: async (req, res, next) => {
		try {
			const { roomId } = req.params;

			const data = await Message.find({ roomId }).populate('sender', 'username');
			const room = await Room.findById(roomId).select('roomId');
			if (!room) {
				res.status(401).json({ message: 'Room not found', code: 401 });
			}
			res.status(200).json({
				data: data,
				code: 200,
				message: 'Successfully Get All Messages',
				roomId: room.roomId,
			});
		} catch (err) {
			res.status(500).json({ message: err.message || 'Internal Server Error', code: 500 });
			next();
		}
	},
	addMessage: async (req, res, next) => {
		try {
			const { roomId } = req.params;
			const { message, username } = req.body;

			const room = await Room.findById(roomId).select('id');
			const sender = await User.findOne({ username }).select('id');

			if (!room) {
				res.status(404).json({ message: 'Room is not available', code: 404 });
				return;
			}
			if (!sender) {
				res.status(403).json({ message: 'You are not the partipant', code: 403 });
				return;
			}
			const data = await Message.create({ sender, message, roomId: room });
			res.status(201).json({ data: data, code: 201, message: 'Successfully Add Message' });
		} catch (err) {
			res.status(500).json({ message: err.message || 'Internal Server Error', code: 500 });
			next();
		}
	},
};
