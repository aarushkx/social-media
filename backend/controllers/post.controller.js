import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = asyncHandler(async (req, res) => {
    const { caption } = req.body;
    let { image } = req.body;

    const user = await User.findById(req.user._id.toString());

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    if (!image) {
        return res.status(400).json({
            error: "Image is required",
        });
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    image = uploadResponse.secure_url;

    const newPost = await Post({
        user: req.user._id,
        caption,
        image,
    });

    await newPost.save();

    return res.status(201).json(newPost);
});

export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
        return res
            .status(401)
            .json({ error: "You are not authorized to delete this post" });
    }

    const imageId = post.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imageId);

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Post deleted successfully" });
});

export const likeUnlikePost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
        // Unlike the post
        await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
        await User.updateOne(
            { _id: userId },
            { $pull: { likedPosts: postId } }
        );

        return res.status(200).json({ message: "Post unliked" });
    } else {
        // Like the post
        post.likes.push(userId);
        await User.updateOne(
            { _id: userId },
            { $push: { likedPosts: postId } }
        );
        await post.save();

        return res.status(200).json({ message: "Post liked" });
    }
});

export const commentOnPost = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
        return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
        user: userId,
        text,
    };

    post.comments.push(newComment);
    await post.save();

    return res.status(200).json(post);
});

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password -email",
        })
        .populate({
            path: "comments.user",
            select: "-password -email",
        });

    if (posts.length === 0) {
        return res.status(200).json([]);
    }

    return res.status(200).json(posts);
});

export const getFollowingPosts = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const followingPosts = await Post.find({ user: { $in: following } })
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password -email",
        })
        .populate({
            path: "comments.user",
            select: "-password -email",
        });

    if (followingPosts.length === 0) {
        return res.status(200).json([]);
    }

    return res.status(200).json(followingPosts);
});

export const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            select: "-password -email",
        })
        .populate({
            path: "comments.user",
            select: "-password -email",
        });

    return res.status(200).json(posts);
});
