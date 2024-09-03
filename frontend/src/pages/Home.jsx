import React, { useState, useEffect } from "react";
import { Header, Post } from "../components/index.js";

function Home() {
    const [activeTab, setActiveTab] = useState(0);

    const postsForYou = [
        {
            id: 1,
            username: "UserA",
            avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://plus.unsplash.com/premium_photo-1665956065384-6f8f2dc08f0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption:
                "This is a post caption for UserA. " +
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quibusdam distinctio beatae dicta repudiandae cumque incidunt sapiente quidem iure quis?",
            date: "September 2, 2024",
            likes: 56,
            comments: 8,
        },
        {
            id: 2,
            username: "UserB",
            avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "This is a post caption for UserB.",
            date: "September 1, 2024",
            likes: 718,
            comments: 92,
        },
        {
            id: 3,
            username: "UserA",
            avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://plus.unsplash.com/premium_photo-1665956065384-6f8f2dc08f0e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption:
                "This is a post caption for UserA. " +
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti quibusdam distinctio beatae dicta repudiandae cumque incidunt sapiente quidem iure quis?",
            date: "September 2, 2024",
            likes: 56,
            comments: 8,
        },
        {
            id: 4,
            username: "UserB",
            avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "This is a post caption for UserB.",
            date: "September 1, 2024",
            likes: 718,
            comments: 92,
        },
    ];

    const postsFollowing = [
        {
            id: 1,
            username: "UserC",
            avatar: "https://images.unsplash.com/photo-1601648460074-aadf16036ac7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://images.unsplash.com/photo-1725142515960-5f5c4dce501f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "This is a post caption for UserC.",
            date: "August 31, 2024",
            likes: 238,
            comments: 217,
        },
        {
            id: 2,
            username: "UserD",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "https://images.unsplash.com/photo-1686808913775-1918be39c29e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "This is a post caption for UserD.",
            date: "August 30, 2024",
            likes: 156,
            comments: 52,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
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

            {/* Content */}
            <div className="container mx-auto max-w-lg p-4 flex-grow">
                {activeTab === 0 &&
                    postsForYou.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}

                {activeTab === 1 &&
                    postsFollowing.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
}

export default Home;
