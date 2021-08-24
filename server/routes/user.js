import express from "express";
import {
	authUser,
	registerUser,
	getUserProfile,
	logout,
	updateUserProfile
} from "../controllers/userController.js";

import protect from "../middleware/protectMiddleware.js";
import validateLogin from "../middleware/validateLogin.js";
import validateRegistration from "../middleware/validateRegistration.js";
import validateUser from "../middleware/validateUser.js";

const router = express.Router();

router.route("/").post(validateRegistration, registerUser);

router.post("/login", validateLogin, authUser);

router.delete("/logout", logout);

router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, validateUser, updateUserProfile);

export default router;
