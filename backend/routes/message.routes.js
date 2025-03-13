import express from "express";
import { getMessages, sendMessage, reactMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/react/:id", protectRoute, reactMessage);

export default router;
