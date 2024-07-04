const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			require: [true, 'Username should not be empty'],
		},
	},
	{ timestamps: true }
);

// userSchema.path('firstUsername').validate(
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

let User = mongoose.model('User', userSchema);

module.exports = User;
