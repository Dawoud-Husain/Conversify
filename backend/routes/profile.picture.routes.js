import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { updateProfilePicture } from "../controllers/profile.picture.controller.js";

const router = express.Router();

router.post("/update-profile-picture", protectRoute, updateProfilePicture);

export default router;
