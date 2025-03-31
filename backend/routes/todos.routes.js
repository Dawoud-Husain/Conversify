/// Sources: // https://github.com/Azim-Ahmed/MERN--TODO/blob/master/todo-backend/src/routes/todos.route.js

import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllTodos, createATodo, deleteATodo } from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getAllTodos);
router.post("/:id", protectRoute, createATodo);
router.delete("/:id", protectRoute, deleteATodo);

export default router;