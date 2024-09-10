import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./components/index.js";
import {
    Login,
    SignUp,
    Home,
    Profile,
    EditProfile,
    CreatePost,
    NotFoundPage,
} from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
            },
            {
                path: "/login",
                element: (
                    <Protected isAuthenticated={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Protected isAuthenticated={false}>
                        <SignUp />
                    </Protected>
                ),
            },
            {
                path: "/create-post",
                element: (
                    <Protected isAuthenticated>
                        <CreatePost />
                    </Protected>
                ),
            },
            {
                path: "/",
                element: (
                    <Protected isAuthenticated>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/profile",
                element: (
                    <Protected isAuthenticated>
                        <Profile />
                    </Protected>
                ),
            },
            {
                path: "/profile/edit",
                element: (
                    <Protected isAuthenticated>
                        <EditProfile />
                    </Protected>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
