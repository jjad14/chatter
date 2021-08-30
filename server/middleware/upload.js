import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	}
});

// check file type
function checkFileType(file, cb) {
	const fileTypes = /jpg|jpeg|png/;
	// check if file is a jpg, jpeg or png
	const extname = fileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	// check mime type
	const mimetype = fileTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	}
	cb("Images only");
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
});

export default upload.single("image");
