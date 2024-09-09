import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BottomNavbar, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { AUTH_API_ENDPOINT } from "./endpoints.js";
import { login, logout } from "./features/authSlice.js";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(
                    `${AUTH_API_ENDPOINT}/current-user`,
                    {
                        withCredentials: true,
                    }
                );

                const userData = response.data;

                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [dispatch]);

    return !loading ? (
        <>
            <main>
                <Outlet />
            </main>
            <BottomNavbar />
        </>
    ) : (
        <>
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </>
    );
}

export default App;
