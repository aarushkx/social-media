import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice.js";
import userSlice from "../features/userSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    },
});

export default store;
