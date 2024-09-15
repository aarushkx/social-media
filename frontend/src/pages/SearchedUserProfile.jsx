import React, { useState, useEffect } from "react";
import { Search, PostDisplayModal } from "../components/index.js";
import LinkIcon from "@mui/icons-material/Link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice.js";
import axios from "axios";
import { POST_API_ENDPOINT, USER_API_ENDPOINT } from "../endpoints.js";
import { PageLoading } from "../components/index.js";

function SearchedUserProfile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const dispatch = useDispatch();
    const { profileData, loading, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.auth.userData);

    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(true);
    const [postError, setPostError] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if (username) {
            dispatch(fetchUserProfile(username));
        }
    }, [dispatch, username]);

    useEffect(() => {
        if (profileData?.followers?.includes(user._id)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [profileData, user._id]);

    useEffect(() => {
        if (user?.username === username) {
            navigate("/profile");
        }
    }, [user, username, navigate]);

    const handleFollowUnfollow = async () => {
        try {
            await axios.post(
                `${USER_API_ENDPOINT}/follow-unfollow/${profileData._id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            setIsFollowing(!isFollowing);

            const updatedFollowers = isFollowing
                ? profileData.followers.filter((id) => id !== user._id)
                : [...profileData.followers, user._id];

            dispatch(
                updateUserProfile({
                    ...profileData,
                    followers: updatedFollowers,
                })
            );
        } catch (error) {
            console.error("Error following/unfollowing user: ", error);
        }
    };

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(
                    `${POST_API_ENDPOINT}/user/${username}`,
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

        if (username) {
            fetchUserPosts();
        }
    }, [username]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-center text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Search />
            {!loading ? (
                <div className="container mx-auto">
                    {/* Profile Info Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-4 pb-0">
                        <div className="flex justify-center lg:justify-center lg:col-span-1">
                            <img
                                src={profileData?.avatar}
                                alt={`${profileData?.name} avatar`}
                                className="w-36 h-36 rounded-full object-cover bg-base-300"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <div className="mb-2">
                                <h1 className="text-2xl font-bold">
                                    {profileData?.name}
                                </h1>
                                <h2 className="text-base text-gray-500">
                                    @{profileData?.username}{" "}
                                    {profileData?.isVerified && (
                                        <VerifiedIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                    )}
                                </h2>
                            </div>
                            {profileData?.bio && (
                                <p className="mb-2 text-sm">
                                    {profileData?.bio}
                                </p>
                            )}

                            {profileData?.link && (
                                <p className="mb-4 text-sm">
                                    <LinkIcon fontSize="small" />{" "}
                                    <Link
                                        to={profileData?.link}
                                        className="text-blue-500 underline"
                                    >
                                        {profileData?.link}
                                    </Link>
                                </p>
                            )}

                            {/* Follow/Unfollow Button */}
                            <div className="mb-8">
                                <button
                                    className={`btn ${
                                        isFollowing
                                            ? "btn-outline"
                                            : "btn-primary"
                                    } btn-sm text-sm`}
                                    onClick={handleFollowUnfollow}
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </button>
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
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="absolute inset-0 object-cover w-full h-full"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="col-span-3 text-center">
                                {profileData?.name} has not posted yet.
                            </p>
                        )}
                    </div>

                    {/* Modal to display selected post */}
                    {selectedPost && (
                        <PostDisplayModal
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                        />
                    )}
                </div>
            ) : (
                <PageLoading />
            )}
        </>
    );
}

export default SearchedUserProfile;
