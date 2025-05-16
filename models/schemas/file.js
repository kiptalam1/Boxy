import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
	mimeType: {
		type: String,
		required: true,
	},
	url: {
		type: String, // cloudinary
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	folder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Folder",
	},
});

export default mongoose.model("File", FileSchema);
