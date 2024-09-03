import React from "react";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { BottomNavbar } from "./components/index.js";

function App() {
    return (
        <>
            <SignUp />
            <Login />
            <Home />
            <Profile />

            <BottomNavbar />
        </>
    );
}

export default App;
