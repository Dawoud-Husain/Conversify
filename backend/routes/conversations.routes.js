import express from "express";
import { delete_conversation } from "../controllers/conversation.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.delete("/:id", protectRoute, delete_conversation);

export default router;