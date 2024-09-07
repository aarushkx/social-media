import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-4">
                <h2 className="text-3xl font-bold text-center">Log In</h2>
                <form onSubmit={handleSubmit}>
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
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
