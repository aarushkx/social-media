import React from "react";
import { Search } from "../components/index.js";

function Profile() {
    const user = {
        name: "John Doe",
        username: "johndoe",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatibus assumenda neque officia.",
        link: "https://johndoe.com",
        avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        followers: 1200,
        following: 300,
        postsCount: 34,
        posts: [
            { id: 1, image: "https://via.placeholder.com/300" },
            { id: 2, image: "https://via.placeholder.com/300" },
            { id: 3, image: "https://via.placeholder.com/300" },
            { id: 4, image: "https://via.placeholder.com/300" },
            { id: 5, image: "https://via.placeholder.com/300" },
            { id: 6, image: "https://via.placeholder.com/300" },
            { id: 7, image: "https://via.placeholder.com/300" },
            { id: 8, image: "https://via.placeholder.com/300" },
            { id: 9, image: "https://via.placeholder.com/300" },
            { id: 10, image: "https://via.placeholder.com/300" },
            { id: 11, image: "https://via.placeholder.com/300" },
            { id: 12, image: "https://via.placeholder.com/300" },
            { id: 13, image: "https://via.placeholder.com/300" },
            { id: 14, image: "https://via.placeholder.com/300" },
            { id: 15, image: "https://via.placeholder.com/300" },
        ],
    };

    return (
        <>
            <Search />
            <div className="container mx-auto">
                {/* Profile Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-4 pb-0">
                    <div className="flex justify-center lg:justify-center lg:col-span-1">
                        <img
                            src={user.avatar}
                            alt={`${user.name} avatar`}
                            className="w-36 h-36 rounded-full object-cover"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <h2 className="text-base text-gray-500 mt-1">
                                @{user.username}
                            </h2>
                        </div>
                        <p className="mb-2 text-sm">{user.bio}</p>
                        <a
                            href={user.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 underline mb-4 inline-block"
                        >
                            {user.link}
                        </a>

                        {/* Edit Profile Button */}
                        <div className="mb-8">
                            <button className="btn btn-outline btn-sm text-sm">
                                Edit Profile
                            </button>
                        </div>

                        <div className="flex space-x-4 justify-center lg:justify-start">
                            <div>
                                <span className="font-bold">
                                    {user.postsCount}
                                </span>{" "}
                                posts
                            </div>
                            <div>
                                <span className="font-bold">
                                    {user.followers}
                                </span>{" "}
                                followers
                            </div>
                            <div>
                                <span className="font-bold">
                                    {user.following}
                                </span>{" "}
                                following
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Grid Section */}
                <div className="grid grid-cols-3 gap-0.5">
                    {user.posts.map((post) => (
                        <div key={post.id} className="aspect-w-1 aspect-h-1">
                            <img
                                src={post.image}
                                alt="User post"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Profile;
