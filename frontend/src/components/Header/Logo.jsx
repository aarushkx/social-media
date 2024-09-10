import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();
    return (
        <h1
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => navigate("/")}
        >
            Cielit
        </h1>
    );
}

export default Logo;
