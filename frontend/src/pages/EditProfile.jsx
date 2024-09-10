import React, { useState } from "react";
import { Header } from "../components/index.js";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "../endpoints.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../features/userSlice.js";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileData = useSelector((state) => state.user.profileData);

    const [formData, setFormData] = useState({
        name: profileData?.name || "",
        username: profileData?.username || "",
        bio: profileData?.bio || "",
        link: profileData?.link || "",
        email: profileData?.email || "",
        currentPassword: "",
        newPassword: "",
        avatar: profileData?.avatar || "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({ ...formData, avatar: event.target.result });
            };
            reader.readAsDataURL(file);
            setAvatarFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("username", formData.username);
            form.append("bio", formData.bio);
            form.append("link", formData.link);
            form.append("email", formData.email);
            form.append("currentPassword", formData.currentPassword);
            form.append("newPassword", formData.newPassword);

            if (avatarFile) {
                form.append("avatar", avatarFile);
            }

            const response = await axios.post(
                `${USER_API_ENDPOINT}/profile/update`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                dispatch(updateUserProfile(response.data));
                navigate("/profile");
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred while updating profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return !loading ? (
        <>
            <Header />
            <div className="container mx-auto max-w-md p-4 mt-16 mb-16">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Edit Profile
                </h1>

                <div className="flex flex-col justify-center items-center mt-8">
                    {/* Avatar Preview */}
                    <img
                        src={formData.avatar}
                        alt={`${formData.name} avatar`}
                        className="w-36 h-36 rounded-full object-cover bg-base-300"
                    />

                    {/* Open Avatar Input */}
                    <button
                        onClick={() =>
                            document.getElementById("avatarInput").click()
                        }
                        className="btn btn-ghost btn-sm text-primary max-w-36 mt-4"
                    >
                        Update Avatar
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        id="avatarInput"
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                    />
                </div>

                {/* Profile Update Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4 mt-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Bio</span>
                        </label>
                        <textarea
                            type="text"
                            name="bio"
                            placeholder="Write a bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows="1"
                            className="textarea textarea-bordered w-full"
                        ></textarea>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Link</span>
                        </label>
                        <input
                            type="text"
                            name="link"
                            placeholder="Enter your website link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Current Password</span>
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="********"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="********"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                        ></input>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full text-lg mt-4 mb-4"
                    >
                        Save Changes
                    </button>
                </form>

                {error && <p className="text-red-600 text-center">{error}</p>}
            </div>
        </>
    ) : (
        // Skeleton UI
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-4 pb-0">
                <div className="flex justify-center lg:justify-center lg:col-span-1">
                    <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
                </div>
                <div className="lg:col-span-2 mt-4">
                    <div className="skeleton h-8 w-28 mb-2"></div>
                    <div className="skeleton h-4 w-24 mb-4"></div>
                    <div className="skeleton h-4 w-56 mb-4"></div>
                    <div className="skeleton h-4 w-36 mb-2"></div>

                    <div className="skeleton h-8 w-24 mb-8"></div>

                    <div className="flex space-x-4 justify-center lg:justify-start">
                        <div className="skeleton text-center h-5 w-72 mb-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
