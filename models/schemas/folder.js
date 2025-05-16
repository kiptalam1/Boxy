import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Folder",
			default: null,
		}, // for nesting
		shared: {
			isShared: { type: Boolean, default: false },
			expiresAt: { type: Date },
			linkId: { type: String }, // e.g. UUID
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Folder", FolderSchema);
