import React, { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Unfilled heart for unliked posts
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart for liked posts
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { formatDate } from "../utils/formatDate.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { POST_API_ENDPOINT } from "../endpoints.js";
import { Link } from "react-router-dom";

function Post({ post }) {
    const user = useSelector((state) => state.auth.userData);

    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(post.comments || []);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const handleLikeUnlike = async () => {
        const wasLiked = isLiked;
        setIsLiked(!wasLiked);
        setLikes((prevLikes) =>
            wasLiked
                ? prevLikes.filter((id) => id !== user._id)
                : [...prevLikes, user._id]
        );

        try {
            await axios.post(
                `${POST_API_ENDPOINT}/like-unlike/${post._id}`,
                null,
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            setIsLiked(wasLiked);
            setLikes((prevLikes) =>
                wasLiked
                    ? [...prevLikes, user._id]
                    : prevLikes.filter((id) => id !== user._id)
            );
            alert("An error occurred while performing this action.");
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setIsSubmittingComment(true);

        try {
            const response = await axios.post(
                `${POST_API_ENDPOINT}/comment/${post._id}`,
                { text: newComment },
                { withCredentials: true }
            );

            const newComment = {
                text: newComment,
                user: {
                    _id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    isVerified: user.isVerified,
                },
                _id: response.data._id,
                createdAt: response.data.createdAt,
            };

            setComments([...comments, newComment]);
            setNewComment("");
        } catch (error) {
            alert("An error occurred while adding the comment.");
        } finally {
            setIsSubmittingComment(false);
        }
    };

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
                <Link to={`/profile/${post.user.username}`}>
                    <img
                        src={post.user.avatar}
                        alt={`${post.user.username} avatar`}
                        className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                </Link>
                <Link to={`/profile/${post.user.username}`}>
                    <span className="font-bold">
                        {post.user.username}{" "}
                        {post.user.isVerified && (
                            <VerifiedIcon color="primary" fontSize="small" />
                        )}
                    </span>
                </Link>

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
                <button
                    onClick={handleLikeUnlike}
                    className="flex items-center space-x-1 focus:outline-none"
                >
                    {isLiked ? (
                        <FavoriteIcon
                            sx={{ marginRight: "0.5rem" }}
                            color="error"
                        />
                    ) : (
                        <FavoriteBorderIcon sx={{ marginRight: "0.5rem" }} />
                    )}
                    {likes.length}
                </button>
                <button
                    onClick={() => setIsCommentModalOpen(true)}
                    className="flex items-center space-x-1 focus:outline-none"
                >
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

            {/* Comment Modal */}
            {isCommentModalOpen && (
                <dialog className="modal" open>
                    <div className="modal-box">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Comments</h3>
                            <button
                                onClick={() => setIsCommentModalOpen(false)}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="py-4 max-h-64 overflow-y-auto">
                            {comments.length > 0 ? (
                                <ul>
                                    {comments.map((comment) => (
                                        <li
                                            key={comment._id}
                                            className="mb-2 border-b border-gray-700 pb-2"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={comment.user.avatar}
                                                    alt={`${comment.user.username} avatar`}
                                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                                />
                                                <div>
                                                    <span className="font-bold">
                                                        {comment.user.username}{" "}
                                                        {comment.user
                                                            .isVerified && (
                                                            <VerifiedIcon
                                                                color="primary"
                                                                fontSize="small"
                                                            />
                                                        )}
                                                    </span>
                                                    <p>{comment.text}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-4 flex items-center">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="input input-bordered flex-grow h-10 rounded-r-none focus:outline-none"
                                disabled={isSubmittingComment}
                            />
                            <button
                                onClick={handleAddComment}
                                className="btn btn-primary btn-sm h-10 rounded-l-none border-l-0 flex items-center justify-center"
                                disabled={isSubmittingComment}
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
}

export default Post;
