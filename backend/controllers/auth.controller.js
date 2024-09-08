import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/tokens/token.js";

export const signup = asyncHandler(async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if (
            [name, email, username, password].some(
                (field) => field?.trim() === ""
            )
        ) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email address",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                error: "Username is already taken",
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                error: "Email is already in use",
            });
        }

        if (name.length > 30) {
            return res.status(400).json({
                error: "Name cannot exceed 30 characters",
            });
        }

        if (email.length > 100) {
            return res.status(400).json({
                error: "Email cannot exceed 100 characters",
            });
        }

        if (username.length > 30) {
            return res.status(400).json({
                error: "Username cannot exceed 30 characters",
            });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        if (createdUser) {
            generateTokenAndSetCookie(res, createdUser._id);
            await createdUser.save();

            return res.status(201).json({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                username: createdUser.username,
                followers: createdUser.followers,
                following: createdUser.following,
                avatar: createdUser.avatar,
            });
        } else {
            return res.status(400).json({
                error: "Failed to create user",
            });
        }
    } catch (error) {
        console.log("ERROR : SIGNUP CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export const login = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        if ([username, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const user = await User.findOne({ username });

        const isMatch = await bcrypt.compare(password, user?.password);

        if (!user || !isMatch) {
            return res.status(400).json({
                error: "Invalid username or password",
            });
        }

        generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            followers: user.followers,
            following: user.following,
            avatar: user.avatar,
        });
    } catch (error) {
        console.log("ERROR : LOGIN CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export const logout = asyncHandler(async (_, res) => {
    try {
        res.clearCookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("ERROR : LOGOUT CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export const currentUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log("ERROR : CURRENT-USER CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});