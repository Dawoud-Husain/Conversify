import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
import { searchUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile/:id", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateProfile);
router.get("/search", protectRoute, searchUsers);

export default router;
