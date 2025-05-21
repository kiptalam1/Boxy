import cloudinary from "../utils/cloudinary.js";
import File from "../models/schemas/file.js";
import User from "../models/schemas/user.js";

export default async function uploadFileToCloudinaryAndDb(req, res) {
	try {
		if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		// upload file to cloudinary;
		const result = await cloudinary.uploader.upload(req.file.path);
		// check if user exists;
		const user = await User.findById(req.user._id);
		if (!user) return res.status(400).json({ message: "User not found!" });

		console.log(user);
		console.log(result);

		// save file metadata to database;
		const newFile = new File({
			name: req.file.originalname || result.original_filename,
			public_id: result.public_id,
			size: result.bytes,
			mimeType: result.format,
			url: result.secure_url,
			owner: user._id,
			folder: req.body.folderId,
		});
		await newFile.save();
		res.status(201).redirect("/dashboard");
	} catch (err) {
		console.error("Upload error:", err);
		res.status(500).json({ message: "Upload failed!", error: err.message });
	}
}
