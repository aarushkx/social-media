import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/handlers/cloudinary.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import bcrypt from "bcrypt";
import { hashString } from "../utils/hash/hashString.js";
import mongoose from "mongoose";

export const getUserProfile = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;
    let user;

    if (mongoose.isValidObjectId(identifier)) {
        user = await User.findById(identifier).select("-password");
    } else {
        user = await User.findOne({ username: identifier }).select(
            "-password -email"
        );
    }

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    return res.status(200).json(user);
});

export const followUnfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
        return res.status(400).json({
            error: "You can't follow or unfollow yourself",
        });
    }

    if (!userToModify || !currentUser) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
        // Unfollow the user
        await User.findByIdAndUpdate(id, {
            $pull: { followers: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: id },
        });

        return res.status(200).json({
            message: `Unfollowed ${userToModify.username}`,
        });
    } else {
        // Follow the user
        await User.findByIdAndUpdate(id, {
            $push: { followers: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
            $push: { following: id },
        });

        return res.status(200).json({
            message: `You are now following ${userToModify.username}`,
        });
    }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, username, bio, link, currentPassword, newPassword } =
        req.body;

    const avatarLocalPath = req.file?.path;

    let user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    if ([name, username, email].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            error: "Name, username, and email cannot be empty",
        });
    }

    if (name) {
        if (name.length > 30) {
            return res.status(400).json({
                error: "Name cannot exceed 30 characters",
            });
        }
        user.name = name;
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email address",
            });
        }

        const existingEmail = await User.findOne({ email });
        if (
            existingEmail &&
            existingEmail._id.toString() !== user._id.toString()
        ) {
            return res.status(400).json({
                error: "Email is already in use",
            });
        }

        if (email.length > 100) {
            return res.status(400).json({
                error: "Email cannot exceed 100 characters",
            });
        }

        user.email = email;
    }

    if (username) {
        if (username.length > 30) {
            return res.status(400).json({
                error: "Username cannot exceed 30 characters",
            });
        }

        const existingUser = await User.findOne({ username });
        if (
            existingUser &&
            existingUser._id.toString() !== user._id.toString()
        ) {
            return res.status(400).json({
                error: "Username is already taken",
            });
        }

        user.username = username;
    }

    if (avatarLocalPath) {
        if (user.avatar) {
            await deleteFromCloudinary(user.avatar);
        }

        const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);

        if (!uploadedAvatar) {
            return res.status(400).json({
                error: "Failed to upload avatar",
            });
        }

        user.avatar = uploadedAvatar.secure_url;
    }

    if (bio) {
        if (bio.length > 300) {
            return res.status(400).json({
                error: "Bio cannot exceed 300 characters",
            });
        }
        user.bio = bio;
    }

    if (link) {
        if (link.length > 300) {
            return res.status(400).json({
                error: "Link cannot exceed 300 characters",
            });
        }
        user.link = link;
    }

    if (
        (!newPassword && currentPassword) ||
        (!currentPassword && newPassword)
    ) {
        return res.status(400).json({
            error: "Please provide both the current and new password",
        });
    }

    if (newPassword && currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: "Current password is incorrect",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long",
            });
        }

        user.password = await hashString(newPassword);
    }

    await user.save();
    user.password = null;

    return res.status(200).json(user);
});

export const deleteUserAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    const userPosts = await Post.find({ user: userId });

    if (userPosts.length > 0) {
        const imageDeletions = userPosts.map(async (post) => {
            await deleteFromCloudinary(post.image);
            await Post.findByIdAndDelete(post._id);
        });
        await Promise.all(imageDeletions);
    }

    if (user.avatar) {
        await deleteFromCloudinary(user.avatar);
    }

    await User.updateMany(
        { followers: userId },
        { $pull: { followers: userId } }
    );
    await User.updateMany(
        { following: userId },
        { $pull: { following: userId } }
    );

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
        message: "Account deleted successfully",
    });
});

export const searchUsers = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({
            error: "Please provide a search query",
        });
    }

    const regexQuery = new RegExp(query, "i");
    const users = await User.find({
        $or: [{ username: regexQuery }, { name: regexQuery }],
    }).select("username name avatar isVerified");

    if (users.length === 0) {
        return res.status(200).json({
            message: "No users found",
        });
    }

    return res.status(200).json(users);
});
