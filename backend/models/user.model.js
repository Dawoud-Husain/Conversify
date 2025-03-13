import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: false,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		company: {
			type: String,
			required: false,
			unique: false,
		},
		about: {
			type: String,
			required: false,
			unique: false,
		},
		languages: {
			type: String,
			required: false,
			unique: false,
		},
		pinnedContacts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		blockedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
