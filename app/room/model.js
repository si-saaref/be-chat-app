const mongoose = require('mongoose');

let roomSchema = mongoose.Schema(
	{
		roomId: {
			type: String,
			require: [true, 'Room Id should not be empty'],
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

// roomSchema.path('firstUsername').validate(
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

let Room = mongoose.model('Room', roomSchema);

module.exports = Room;
