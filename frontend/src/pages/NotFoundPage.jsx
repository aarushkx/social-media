import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex justify-center items-center h-screen text-center">
            <div className="flex flex-col justify-center items-center max-w-md">
                <h1 className="text-4xl font-bold mb-4 text-red-600">
                    404 - Page Not Found
                </h1>
                <p className="text-lg mb-8">
                    The page you are looking for does not exist.
                </p>
                <p>
                    Let's get back to your{" "}
                    {
                        <Link to="/" className="text-primary hover:underline">
                            home
                        </Link>
                    }
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
