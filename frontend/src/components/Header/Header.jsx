import React, { useEffect, useState } from "react";
import { Logo } from "../index.js";
import { LogoutButton } from "../index.js";
import { useSelector } from "react-redux";

function Header({ isSliding }) {
    const authStatus = useSelector((state) => state.auth.status);

    const [isVisible, setIsVisible] = useState(true);
    let lastScrollY = 0;

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) setIsVisible(false);
        else setIsVisible(true);

        lastScrollY = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`header flex justify-between bg-base-300 p-4 fixed top-0 w-full z-10 ${
                isSliding
                    ? `transition-transform duration-300 ${
                          isVisible ? "translate-y-0" : "-translate-y-full"
                      }`
                    : ""
            }`}
        >
            <Logo />
            {authStatus && <LogoutButton />}
        </div>
    );
}

export default Header;
