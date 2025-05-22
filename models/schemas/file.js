import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	public_id: {
		type: String,
		required: true,
	}, // Cloudinary ID
	size: {
		type: Number,
		required: true,
	},
	mimeType: {
		type: String,
		required: true,
	},
	fileType: {
		type: String,
		enum: ["image", "document", "video", "audio", "archive", "other"],
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
		default: null,
	},
});

// Helper method to get icon based on file type
FileSchema.methods.getIcon = function () {
	const icons = {
		image: "file-image",
		document: "file-alt",
		video: "file-video",
		audio: "file-audio",
		archive: "file-archive",
		other: "file",
	};
	return icons[this.fileType] || "file";
};


export default mongoose.model("File", FileSchema);
