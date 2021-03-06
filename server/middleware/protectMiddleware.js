import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/User.js";

// Check if user is authenticated via cookie

const protect = asyncHandler(async (req, res, next) => {
	const token = req.cookies["Bearer"];

	if (!token) {
		res.status(401);
		throw new Error("You Are Not Authorized");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

		req.user = await User.findById(decoded.id).select("-password");

		// if there is no user
		if (!req.user) {
			res.status(400);
			throw new Error("User not found");
		}

		next();
	} catch (err) {
		res.clearCookie("Bearer");
		res.status(401);
		throw new Error("Not Authorization");
	}
});

export default protect;
