import mongoose from "mongoose";

// Validation middleware to check if an id is a valid ObjectId
const checkObjectId = (id) => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
		res.status(404);
		throw new Error("Resource Not Found");
	}
	next();
};

export default checkObjectId;
