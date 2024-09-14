import React, { useState, useEffect } from "react";
import { Header, Post } from "../components/index.js";
import { POST_API_ENDPOINT } from "../endpoints.js";
import axios from "axios";

function Home() {
    const [activeTab, setActiveTab] = useState(0); // 0: "For You", 1: "Following"
    const [postsForYou, setPostsForYou] = useState([]);
    const [postsFollowing, setPostsFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    let [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError("");

            try {
                if (activeTab === 0) {
                    // Fetch "For You" posts
                    const response = await axios.get(
                        `${POST_API_ENDPOINT}/all`,
                        {
                            withCredentials: true,
                        }
                    );
                    setPostsForYou(response.data);
                } else if (activeTab === 1) {
                    // Fetch "Following" posts
                    const response = await axios.get(
                        `${POST_API_ENDPOINT}/following`,
                        {
                            withCredentials: true,
                        }
                    );
                    setPostsFollowing(response.data);
                }
            } catch (error) {
                setError(
                    error.response?.data?.error ||
                        "An error occurred while fetching posts."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [activeTab]);

    return (
        <div className="flex flex-col min-h-screen mb-16">
            <Header isSliding={true} />

            {/* Tabs */}
            <div className="container mx-auto mt-16 flex justify-center py-4">
                <button
                    className={`px-4 py-2 ${
                        activeTab === 0 ? "border-b-2 border-primary" : ""
                    }`}
                    onClick={() => setActiveTab(0)}
                >
                    For You
                </button>
                <button
                    className={`px-4 py-2 ml-4 ${
                        activeTab === 1 ? "border-b-2 border-primary" : ""
                    }`}
                    onClick={() => setActiveTab(1)}
                >
                    Following
                </button>
            </div>

            {/* Posts */}
            <div className="container mx-auto max-w-lg p-4 flex-grow">
                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <span className="loading loading-dots loading-lg "></span>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : activeTab === 0 ? (
                    postsForYou.length > 0 ? (
                        postsForYou.map((post) => (
                            <Post key={post._id} post={post} />
                        ))
                    ) : (
                        <p className="text-center">
                            No posts available for you.
                        </p>
                    )
                ) : postsFollowing.length > 0 ? (
                    postsFollowing.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                ) : (
                    <p className="text-center">No posts from followed users.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
