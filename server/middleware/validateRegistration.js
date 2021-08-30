import { check, validationResult } from "express-validator";

import User from "../models/User.js";

// Validation middleware for registrating a user
const validateRegistration = [
	check("email", "A valid email is required").isEmail(),
	check("userName", "A username is required").not().isEmpty(),
	check("password", "Password must have a minimum of 6 characters").isLength({
		min: 6
	}),
	check("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Passwords do not match. Please try again.");
		}
		// Indicates the success of this synchronous custom validator
		return true;
	}),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				message: errors
					.array()
					.reduce((str, err) => `${str} ${err.msg},`, " ")
			});
		}

		const { email } = req.body;

		// check if email is in user
		const user = await User.findOne({ email });

		// user with that email doesnt exist
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		next();
	}
];

export default validateRegistration;
