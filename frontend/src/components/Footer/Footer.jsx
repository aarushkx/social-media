import React from "react";

function Footer() {
    return (
        <footer className="footer footer-center  bg-base-200 text-base-content p-2">
            <aside>
                <p>
                    &copy; {new Date().getFullYear()} Social Media. All rights
                    reserved.
                </p>
            </aside>
        </footer>
    );
}

export default Footer;
