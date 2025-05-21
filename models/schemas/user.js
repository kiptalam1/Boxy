import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		rootFolder: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Folder",
			default: null,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("User", UserSchema);
