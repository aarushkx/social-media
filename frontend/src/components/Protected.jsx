import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, isAuthenticated = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (isAuthenticated && authStatus !== isAuthenticated) {
            navigate("/login");
        } else if (!isAuthenticated && authStatus !== isAuthenticated) {
            navigate("/");
        }
        setLoading(false);
    }, [authStatus, navigate, isAuthenticated]);

    return loading ? <div>Loading...</div> : <>{children}</>;
}

export default Protected;