import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_API_ENDPOINT } from "../../endpoints.js";
import { login } from "../../features/authSlice.js";
import { useDispatch } from "react-redux";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { username, password } = formData;
            const response = await axios.post(
                `${AUTH_API_ENDPOINT}/login`,
                {
                    username,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const userData = response.data;

            dispatch(login(userData));
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    "An error occurred during log in."
            );
        }
    };

    return (
        <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-4">
                <h2 className="text-3xl font-bold text-center">Log In</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="johndoe"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button
                            className="btn btn-primary w-full text-lg"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        className="cursor-pointer text-blue-300 hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up here
                    </Link>
                    {error && (
                        <p className="text-red-600 text-center mt-2">{error}</p>
                    )}
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
