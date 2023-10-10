const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: [true, "Please Enter your email address"],
		},
		email: {
			type: String,
			required: [true, "Please Enter your Email address"],
		},
		phone: {
			type: String,
			required: [true, "Please Enter your a phone Number"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Contact", contactSchema);
