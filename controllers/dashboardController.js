import cloudinary from "../utils/cloudinary.js";
import File from "../models/schemas/file.js";
import User from "../models/schemas/user.js";
import Folder from "../models/schemas/folder.js";

export async function displayDashboardContent(req, res) {
	try {
		// Get root folder contents for the user
		const rootFolder = await Folder.findOne({
			owner: req.user._id,
			isRoot: true,
		}).populate("files folders");

		// Default folder object if none exists
		const defaultFolder = {
			name: "My Files",
			_id: null,
			path: "/",
			isRoot: true,
		};

		// If no root folder exists, create one
		if (!rootFolder) {
			const newRootFolder = new Folder({
				name: "Root",
				owner: req.user._id,
				isRoot: true,
				path: "/",
			});
			await newRootFolder.save();

			return res.render("dashboard", {
				displayName: req.user.displayName,
				files: [],
				folders: [],
				currentFolder: newRootFolder || defaultFolder,
				message: `Welcome ${req.user.displayName}`,
			});
		}

		res.render("dashboard", {
			displayName: req.user.displayName,
			files: rootFolder.files || [],
			folders: rootFolder.folders || [],
			currentFolder: rootFolder || defaultFolder,
			message: `Welcome ${req.user.displayName}`,
		});
	} catch (err) {
		console.error("Dashboard error:", err);
		res.render("dashboard", {
			displayName: req.user.displayName,
			files: [],
			folders: [],
			currentFolder: {
				name: "My Files",
				_id: null,
				path: "/",
				isRoot: true,
			},
			message: "Error loading your files",
		});
	}
}
