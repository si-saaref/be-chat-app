const mongoose = require('mongoose');

let messageSchema = mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		roomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
		},
		message: {
			type: String,
			require: [true, 'Username should not be empty'],
		},
	},
	{ timestamps: true }
);

// messageSchema.path('firstUsername').validate(
// 	async function (value) {
// 		try {
// 			const count = await this.model('Room').countDocuments({ email: value });

// 			return !count;
// 		} catch (err) {
// 			throw err;
// 		}
// 	},
// 	(attr) => `${attr.value} already existed`
// );

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
