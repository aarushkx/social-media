import React from "react";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

import { BottomNavbar } from "./components/index.js";

function App() {
    return (
        <>
            {/* <SignUp />
            <Login />
            <Home /> */}
            <Profile />
            
            {/* <CreatePost /> */}

            <BottomNavbar />
        </>
    );
}

export default App;
