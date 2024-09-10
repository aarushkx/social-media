import React, { useState } from "react";

function Create() {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Image:", image);
        console.log("Caption:", caption);
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

                {image && (
                    <div
                        className="mb-4 relative w-full"
                        style={{ paddingTop: "100%" }}
                    >
                        <img
                            src={image}
                            alt="Preview"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            style={{ objectFit: "cover" }}
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
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default Create;
