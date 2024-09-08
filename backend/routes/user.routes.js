import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    getUserProfile,
    followUnfollowUser,
    updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);
router.post("/profile/update", protectRoute, updateUserProfile);

export default router;
