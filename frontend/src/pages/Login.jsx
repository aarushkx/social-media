import React from "react";

function Login() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 space-y-4">
                <h2 className="text-3xl font-bold text-center">Log In</h2>
                <form>
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
                        <button className="btn btn-primary w-full">
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <a href="#" className="text-blue-300">
                        Sign Up here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
