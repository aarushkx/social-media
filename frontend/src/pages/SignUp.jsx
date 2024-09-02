import React from "react";
import { Header, Footer, SignUpForm } from "../components/index.js";

function SignUp() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <SignUpForm />
            <Footer />
        </div>
    );
}

export default SignUp;
