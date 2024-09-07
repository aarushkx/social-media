import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavbar, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(false);
    }, []);

    return !loading ? (
        <>
            <main>
                <Outlet />
            </main>
            <BottomNavbar />
        </>
    ) : (
        <>
            <div>Loading...</div>
        </>
    );
}

export default App;
