import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    signup,
    login,
    logout,
    currentUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/current-user", protectRoute, currentUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
