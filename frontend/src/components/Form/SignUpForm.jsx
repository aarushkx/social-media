import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-4">
                <h2 className="text-3xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="johndoe@example.com"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="johndoe"
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
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button
                            className="btn btn-primary w-full text-lg"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        className="cursor-pointer text-blue-300 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpForm;
