import React, { useState, useEffect } from "react";
import { Search, EditProfileModal } from "../components/index.js";
import LinkIcon from "@mui/icons-material/Link";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice.js";
import axios from "axios";
import { POST_API_ENDPOINT } from "../endpoints.js";

function Profile() {
    const dispatch = useDispatch();

    const { profileData, loading, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.auth.userData);

    const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(true);
    const [postError, setPostError] = useState("");

    // Fetch user profile data
    useEffect(() => {
        if (user.username) {
            dispatch(fetchUserProfile(user.username));
        }
    }, [dispatch, user.username]);

    // Fetch user posts
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(
                    `${POST_API_ENDPOINT}/user/${user.username}`,
                    {
                        withCredentials: true,
                    }
                );
                setPosts(response.data);
            } catch (error) {
                setPostError(
                    error.response?.data?.error ||
                        "An error occurred while fetching user posts."
                );
            } finally {
                setPostLoading(false);
            }
        };

        if (user.username) {
            fetchUserPosts();
        }
    }, [user.username]);

    const handleProfileUpdate = (updatedProfile) => {
        dispatch(updateUserProfile(updatedProfile));
    };

    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <>
            <Search />
            {!loading ? (
                <div className="container mx-auto">
                    {/* Profile Info Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-4 pb-0">
                        <div className="flex justify-center lg:justify-center lg:col-span-1">
                            <img
                                src={
                                    profileData?.avatar || "/avatar/default.png"
                                }
                                alt={`${profileData?.name} avatar`}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <div className="mb-4">
                                <h1 className="text-2xl font-bold">
                                    {profileData?.name}
                                </h1>
                                <h2 className="text-base text-gray-500 mt-1">
                                    @{profileData?.username}
                                </h2>
                            </div>
                            <p className="mb-2 text-sm">{profileData?.bio}</p>
                            <LinkIcon fontSize="small" />{" "}
                            <Link
                                to={profileData?.link || "/default-profile"}
                                className="text-sm text-blue-500 underline mb-4 inline-block"
                            >
                                {profileData?.link}
                            </Link>
                            {/* Edit Profile Button */}
                            <div className="mb-8">
                                <button
                                    className="btn btn-outline btn-sm text-sm"
                                    onClick={() =>
                                        setEditProfileModalOpen(true)
                                    }
                                >
                                    Edit Profile
                                </button>

                                <EditProfileModal
                                    isOpen={isEditProfileModalOpen}
                                    onClose={() =>
                                        setEditProfileModalOpen(false)
                                    }
                                    onSave={handleProfileUpdate}
                                />
                            </div>
                            {/* Profile Stats Section */}
                            <div className="flex space-x-4 justify-center lg:justify-start">
                                <div>
                                    <span className="font-bold">
                                        {posts?.length || 0}
                                    </span>{" "}
                                    posts
                                </div>
                                <div>
                                    <span className="font-bold">
                                        {profileData?.followers?.length || 0}
                                    </span>{" "}
                                    followers
                                </div>
                                <div>
                                    <span className="font-bold">
                                        {profileData?.following?.length || 0}
                                    </span>{" "}
                                    following
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts Grid Section */}
                    <div className="grid grid-cols-3 gap-0.5 mb-12">
                        {postLoading ? (
                            <>
                                {Array(posts.length)
                                    .fill("")
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className="relative w-full pt-[100%]"
                                        >
                                            <div className="skeleton absolute inset-0 w-full h-full"></div>
                                        </div>
                                    ))}
                            </>
                        ) : postError ? (
                            <p className="col-span-3 text-center text-red-600">
                                {postError}
                            </p>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div
                                    key={post._id}
                                    className="relative w-full pt-[100%] hover:opacity-40 hover:cursor-pointer"
                                >
                                    <img
                                        src={post.image}
                                        alt="User post"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="col-span-3 text-center">
                                You don't have any posts yet
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                // Skeleton UI
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-4 pb-0">
                        <div className="flex justify-center lg:justify-center lg:col-span-1">
                            <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="skeleton h-8 w-28 mb-6"></div>
                            <div className="skeleton h-4 w-16 mb-4"></div>
                            <div className="skeleton h-4 w-56 mb-4"></div>
                            <div className="skeleton h-4 w-36 mb-4"></div>

                            <div className="skeleton h-8 w-24 mb-8"></div>

                            <div className="flex space-x-4 justify-center lg:justify-start">
                                <div className="skeleton text-center h-5 w-72 mb-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
