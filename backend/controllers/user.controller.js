import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { hashString } from "../utils/hash/hashString.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("ERROR : GET-USER-PROFILE CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export const followUnfollowUser = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        console.log(
            "ERROR : FOLLOW-UNFOLLOW-USER CONTROLLER : ",
            error.message
        );
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, username, bio, link, currentPassword, newPassword } =
        req.body;
    let { avatar } = req.body;

    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
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

        if (avatar) {
            if (user.avatar) {
                await cloudinary.uploader.destroy(
                    user.avatar.split("/").pop().split(".")[0]
                );
            }
            const uploadedAvatar = await cloudinary.uploader.upload(avatar);
            avatar = uploadedAvatar.secure_url;
            user.avatar = avatar;
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
            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );

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
    } catch (error) {
        console.log("ERROR : UPDATE-USER-PROFILE CONTROLLER : ", error.message);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
});
