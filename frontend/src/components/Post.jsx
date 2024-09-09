import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Unfilled heart for unliked posts
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart for liked posts
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function Post({ post }) {
    return (
        <div className="bg-base-200 rounded shadow-md p-4 mb-4 max-w-md mx-auto">
            {/* Header with avatar and username */}
            <div className="flex items-center mb-4">
                <img
                    src={post.avatar}
                    alt={`${post.username} avatar`}
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <span className="font-bold">{post.username}</span>
            </div>

            {/* Post Image */}
            <div
                className="relative w-full"
                style={{
                    // paddingTop: "125%" /* 4:3 */,
                    // paddingTop: "80%", /* 4:5 */
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
                    {post.likes}
                </button>
                <button className="flex items-center space-x-1 focus:outline-none">
                    <ChatBubbleOutlineOutlinedIcon
                        sx={{ marginRight: "0.5rem" }}
                    />
                    {post.comments}
                </button>
            </div>

            {/* Caption */}
            <div className="mb-2 text-sm">
                <span className="font-bold">{post.username}</span>{" "}
                {post.caption}
            </div>

            {/* Date */}
            <div className="text-gray-500 text-sm">{post.date}</div>
        </div>
    );
}

export default Post;
