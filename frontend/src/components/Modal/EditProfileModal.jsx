import React, { useState } from "react";

function EditProfileModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        avatar: null,
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, avatar: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        // For now, just close the modal after submission
        console.log(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-base-300 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-xl text-center font-bold mb-4">
                    Edit Profile
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Avatar */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Avatar</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>

                    {/* Name */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Current Password */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Current Password</span>
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* New Password */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="modal-action flex justify-end">
                        <button
                            type="button"
                            className="btn btn-ghost mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;
