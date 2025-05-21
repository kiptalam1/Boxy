import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// how the files will be stored;
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve(process.cwd(), "uploads"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix + ext);
	},
});

// limit file types to be uploaded to lightweight types;
const fileFilter = (req, file, cb) => {
	const allowedTypes = [
		"image/jpeg",
		"image/png",
		"image/jpg",
		"application/pdf",
		"text/plain",
	];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Unsupported file type"), false);
	}
};

// limit the upload files size to 5 mb;
const limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({
	storage,
	limits,
	fileFilter,
});

export default upload;
