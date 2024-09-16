import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice.js";
import { clearProfile } from "../../features/userSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API_ENDPOINT, USER_API_ENDPOINT } from "../../endpoints.js";

function Settings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(
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
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (!confirmed) return;

        try {
            await axios.delete(`${USER_API_ENDPOINT}/profile`, {
                withCredentials: true,
            });
            dispatch(logout());
            dispatch(clearProfile());
            navigate("/login");
        } catch (error) {
            alert("An error occurred while deleting the account.");
        }
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
                <SettingsIcon />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
                <li>
                    <Link onClick={handleLogout}>Log out</Link>
                </li>
                <li>
                    <Link
                        onClick={handleDeleteAccount}
                        className="text-red-600"
                    >
                        Delete Account
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Settings;
