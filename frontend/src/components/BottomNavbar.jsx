import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function BottomNavbar() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    const [activeButton, setActiveButton] = useState("profile");

    useEffect(() => {
        const currentPath = location.pathname;

        const pathToValueMap = {
            "/": "home",
            "/create-post": "create",
            "/profile": "profile",
            "/profile/edit": "profile",
        };

        const activeValue = pathToValueMap[currentPath] || "profile";
        setActiveButton(activeValue);
    }, [location.pathname]);

    const items = [
        {
            name: "Home",
            value: "home",
            url: "/",
            isActive: authStatus,
            icon: <HomeIcon fontSize="large" />,
        },
        {
            name: "Create",
            value: "create",
            url: "/create-post",
            isActive: authStatus,
            icon: <AddCircleOutlineIcon fontSize="large" />,
        },
        {
            name: "Profile",
            value: "profile",
            url: "/profile",
            isActive: authStatus,
            icon: <PersonIcon fontSize="large" />,
        },
    ];

    return (
        <div
            className={`btm-nav bg-base-100 max-h-12 flex justify-between items-center p-4 z-99 fixed bottom-0 left-0 right-0 
                ${authStatus ? "border-t border-gray-700" : ""} 
                ${!authStatus ? "opacity-0" : ""}`}
        >
            {items.map((item, index) =>
                item.isActive ? (
                    <button
                        key={index}
                        onClick={() => {
                            setActiveButton(item.value);
                            navigate(item.url);
                        }}
                        className={`flex flex-col items-center ${
                            activeButton === item.value
                                ? "text-primary"
                                : "text-gray-500"
                        }`}
                    >
                        {item.icon}
                    </button>
                ) : null
            )}
        </div>
    );
}

export default BottomNavbar;
