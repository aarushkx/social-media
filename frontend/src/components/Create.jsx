import React, { useState } from "react";
import { POST_API_ENDPOINT } from "../endpoints.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData();

        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            console.log("NO IMAGE FILE");
            return;
        }
        formData.append("caption", caption);

        try {
            const response = await axios.post(
                `${POST_API_ENDPOINT}/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            setImageFile(null);
            setCaption("");
            setImagePreview(null);
            navigate("/");
        } catch (error) {
            setError(
                error?.response?.data?.error ||
                    "An error occurred while creating the post."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-md p-4 mt-16">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Create a New Post
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={handleImageChange}
                    />
                </div>

                {imagePreview && (
                    <div className="mb-4 relative w-full pt-[100%]">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Caption</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg mb-20"
                    disabled={loading}
                >
                    Post
                </button>
                {loading && <p>Loading...</p>}
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Create;
