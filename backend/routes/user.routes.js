import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    getUserProfile,
    followUnfollowUser,
    updateUserProfile,
    deleteUserAccount,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow-unfollow/:id", protectRoute, followUnfollowUser);
router.post(
    "/profile/update",
    protectRoute,
    upload.single("avatar"),
    updateUserProfile
);
router.delete("/profile", protectRoute, deleteUserAccount);

export default router;
