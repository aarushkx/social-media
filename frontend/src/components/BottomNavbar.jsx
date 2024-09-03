import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";

function BottomNavbar() {
    const [activeButton, setActiveButton] = useState(0);

    return (
        <div className="btm-nav flex justify-between items-center p-3 border-t border-gray-700">
            <button
                onClick={() => setActiveButton(0)}
                className={`flex flex-col items-center ${
                    activeButton === 0 ? "text-primary" : "text-gray-500"
                }`}
            >
                <HomeIcon fontSize="large" />
            </button>

            <button
                onClick={() => setActiveButton(1)}
                className={`flex flex-col items-center ${
                    activeButton === 1 ? "text-primary" : "text-gray-500"
                }`}
            >
                <AddCircleOutlineIcon fontSize="large" />
            </button>

            <button
                onClick={() => setActiveButton(2)}
                className={`flex flex-col items-center ${
                    activeButton === 2 ? "text-primary" : "text-gray-500"
                }`}
            >
                <PersonIcon fontSize="large" />
            </button>
        </div>
    );
}

export default BottomNavbar;
