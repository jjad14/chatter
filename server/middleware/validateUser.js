import { body, validationResult } from "express-validator";

// validation middleware for updating a user
const validateUser = [
	body("userName", "A UserName is required").not().isEmpty(),
	body("email", "A valid email is required").isEmail(),
	body("password", "A valid password with a min of 6 characters is required")
		.isLength({ min: 6 })
		.optional({ checkFalsy: true }),
	body("confirmPassword")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match. Please try again.");
			}
			// Indicates the success of this synchronous custom validator
			return true;
		})
		.optional({ checkFalsy: true }),
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				message: errors
					.array()
					.reduce((str, err) => `${str} ${err.msg},`, " ")
			});
		}

		next();
	}
];

export default validateUser;
