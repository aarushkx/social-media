import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Unfilled heart for unliked posts
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart for liked posts
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../utils/formatDate.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { POST_API_ENDPOINT } from "../endpoints.js";

function Post({ post }) {
    const user = useSelector((state) => state.auth.userData);

    const handleDelete = async () => {
        try {
            await axios.delete(`${POST_API_ENDPOINT}/${post._id}`, {
                withCredentials: true,
            });
        } catch (error) {
            alert("An error occurred while deleting the post.");
        }
    };

    return (
        <div className="bg-base-200 rounded shadow-md p-4 mb-4 max-w-md mx-auto">
            {/* Header with avatar and username */}
            <div className="flex items-center mb-4">
                <img
                    src={post.user.avatar}
                    alt={`${post.user.username} avatar`}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <span className="font-bold">
                    {post.user.username}{" "}
                    {post.user.isVerified && (
                        <VerifiedIcon color="primary" fontSize="small" />
                    )}
                </span>
                {/* Delete Icon */}
                {user._id === post.user._id && (
                    <button
                        className="text-gray-500 hover:text-red-600 focus:outline-none ml-auto"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </button>
                )}
            </div>

            {/* Post Image */}
            <div
                className="relative w-full"
                style={{
                    paddingTop: "100%" /* 1:1 */,
                }}
            >
                <img
                    src={post.image}
                    alt="Post content"
                    className="absolute inset-0 w-full h-full object-cover rounded"
                    style={{ objectFit: "cover" }}
                />
            </div>

            {/* Like and Comment buttons */}
            <div className="flex space-x-4 mb-4 mt-4">
                <button className="flex items-center space-x-1 focus:outline-none">
                    <FavoriteBorderIcon sx={{ marginRight: "0.5rem" }} />
                    {post.likes.length}
                </button>
                <button className="flex items-center space-x-1 focus:outline-none">
                    <ChatBubbleOutlineOutlinedIcon
                        sx={{ marginRight: "0.5rem" }}
                    />
                    {post.comments.length}
                </button>
            </div>

            {/* Caption */}
            <div className="mb-2 text-sm">
                <span className="font-bold">{post.user.username}</span>{" "}
                {post.caption}
            </div>

            {/* Date */}
            <div className="text-gray-500 text-sm">
                {formatDate(new Date(post.createdAt))}
            </div>
        </div>
    );
}

export default Post;
