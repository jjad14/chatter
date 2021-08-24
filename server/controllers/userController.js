import asyncHandler from "express-async-handler";

import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// Cookie Configuration
const cookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: "Strict", // Strict | Lax | None
	maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// GET api/users/login
// Authenticate User and get token
// Public access
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check if email is in user
	const user = await User.findOne({ email });

	// user with that email doesnt exist
	if (!user) {
		res.status(401);
		throw new Error("Invalid User Credentials");
	}

	// compare req.body and stored hash password
	const match = await user.matchPassword(password);

	if (!match) {
		res.status(401);
		throw new Error("Invalid User Credentials");
	}

	// generate token
	const token = generateToken(user._id);

	// set cookie
	res.cookie("Bearer", token, cookieOptions);

	// return user info
	// TODO: return image as well
	return res.json({
		_id: user._id,
		userName: user.userName,
		email: user.email,
		image: "default image"
	});
});

// POST /api/users/
// Register a new user
// Public Access
const registerUser = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;

	// create a user object
	// create is basically syntactic sugar for the save method
	const user = await User.create({
		userName,
		email,
		password // hashed in user model
	});

	// generate token
	const token = generateToken(user._id);

	// set cookie
	res.cookie("Bearer", token, cookieOptions);

	// return user info
	return res.status(201).json({
		_id: user._id,
		userName: user.userName,
		email: user.email,
		image: "default image"
	});
});

// GET api/users/profile
// Get the users profile
// Private access
const getUserProfile = asyncHandler(async (req, res) => {
	// user is added to req object by authMiddleWare
	res.json({
		_id: req.user._id,
		userName: req.user.userName,
		email: req.user.email
	});
});

// GET api/users/profile
// Update the users profile
// Private access
const updateUserProfile = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;

	if (userName) req.user.userName = userName;
	if (email) req.user.email = email;
	if (password) req.user.password = password;

	await req.user.save();

	res.json({
		_id: req.user._id,
		userName: req.user.userName,
		email: req.user.email
	});
});

const logout = (req, res) => {
	// expire cookie and send back, which will be removed
	res.cookie("Bearer", "", {
		httpOnly: true,
		expires: new Date(0),
		secure: true,
		sameSite: "none"
	})
		.status(204)
		.send();
};

export { authUser, registerUser, getUserProfile, updateUserProfile, logout };
