// Sources: https://github.com/Azim-Ahmed/MERN--TODO/blob/master/todo-backend/src/models/todos.model.js

import mongoose from "mongoose";

// Todo has a title and date feild 

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must be provided todo title"],
    maxlength: [100, "Title must be less than 100 characters"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", todoSchema);