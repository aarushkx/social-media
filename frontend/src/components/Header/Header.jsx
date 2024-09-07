import React, { useEffect, useState } from "react";
import { Logo } from "../index.js";

function Header({ isSliding }) {
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
            className={`header bg-base-300 p-4 fixed top-0 w-full z-10 ${
                isSliding
                    ? `transition-transform duration-300 ${
                          isVisible ? "translate-y-0" : "-translate-y-full"
                      }`
                    : ""
            }`}
        >
            <Logo />
        </div>
    );
}

export default Header;
