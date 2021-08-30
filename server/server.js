import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import colors from "colors";
import session from "express-session";
import path from "path";

import connectDB from "./data/db.js";
import userRoutes from "./routes/user.js";
import { notFound, errorHandler } from "./middleware/errors.js";

dotenv.config();

// create express app
const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true
	})
);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// Define Routes
app.use("/api/user", userRoutes);

// access __dirname with es6 modules
const folder = path.resolve();

// make uploads folder static
// app.use("/uploads", express.static(path.join(folder, "/uploads")));
app.use("/uploads", express.static("uploads"));

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);
