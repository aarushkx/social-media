import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearProfile } from "../features/userSlice.js";
import { logout } from "../features/authSlice.js";
import { AUTH_API_ENDPOINT } from "../endpoints.js";
import axios from "axios";

function LogoutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${AUTH_API_ENDPOINT}/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            dispatch(logout());
            dispatch(clearProfile());
            navigate("/login");
        } catch (error) {
            alert("Error logging out");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm text-sm flex items-center space-x-2"
        >
            <LogoutIcon />
        </button>
    );
}

export default LogoutButton;
