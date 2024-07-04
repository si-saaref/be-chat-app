const Room = require('./model');
const User = require('../users/model');

module.exports = {
	joinRoom: async (req, res, next) => {
		const { username, roomId } = req.body;

		Room.findOne({ roomId: roomId })
			.populate('users')
			.then(async (room) => {
				if (!room) {
					const isExistUsername = await User.findOne({ username });
					let user = isExistUsername ?? (await User.create({ username }));
					const chatData = await Room.create({ users: user, roomId });
					res.status(201).json({ data: chatData, message: 'Success join room chat', code: 201 });
				} else {
					const isExistUsername = room.users.find((user) => user.username === username);
					if (isExistUsername) {
						res.status(400).json({
							message: 'Username already used. Plase use another one',
							code: 400,
						});
					} else {
						const newUser = await User.create({ username });
						const listUser = [...room.users, newUser];
						const chatData = await Room.findOneAndUpdate({ roomId }, { users: listUser });
						res.status(201).json({ data: chatData, message: 'Success join room chat', code: 201 });
					}
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err.message || 'Internal Server Error', code: 500 });
				next();
			});
	},
};
