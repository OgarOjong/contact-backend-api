const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please add username"],
		},
		email: {
			type: String,
			required: [true, "Please inpute and email address"],
			unique: [true, "Please Email address is taken"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("User", userSchema);
