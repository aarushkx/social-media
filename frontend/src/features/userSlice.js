import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_ENDPOINT } from "../endpoints.js";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(
                `${USER_API_ENDPOINT}/profile/${userId}`,
                {
                    withCredentials: true,
                }
            );            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.error ||
                    "An error occurred while fetching user profile."
            );
        }
    }
);

const initialState = {
    profileData: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.profileData = null;
            state.loading = false;
            state.error = null;
        },
        updateUserProfile: (state, action) => {
            if (state.profileData) {
                state.profileData = {
                    ...state.profileData,
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearProfile, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
