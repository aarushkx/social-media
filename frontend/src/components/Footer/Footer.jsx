import React from "react";

function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-2 z-9999">
            <aside>
                <p>
                    &copy; {new Date().getFullYear()} Cielit. All rights
                    reserved.
                </p>
            </aside>
        </footer>
    );
}

export default Footer;
