import React from "react";
import { Header, Footer, LoginForm } from "../components/index.js";

function Login() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <LoginForm />
            <Footer />
        </div>
    );
}

export default Login;
