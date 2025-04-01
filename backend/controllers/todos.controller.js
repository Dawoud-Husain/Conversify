// Sources: https://github.com/Azim-Ahmed/MERN--TODO/blob/master/todo-backend/src/controllers/todos.controller.js

import Todo from "../models/todos.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Conversation from "../models/conversation.model.js";

// Retreive Todos for the corresponding conversation
export const getAllTodos = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("todolist");

    if (!conversation) return res.status(200).json([]);
    
    res.status(200).json(conversation.todolist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add todo to database
export const createATodo = async (req, res) => {

    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { title, description, steps } = req.body;
    
    try {
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
    

      const newTodo = new Todo({
        title,
      });

      await newTodo.save();
      conversation.todolist.push(newTodo._id);
      await conversation.save();

      res.status(201).json(newTodo);
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete todo from db
export const deleteATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    }

    await Conversation.updateMany(
      { todolist: todoId },
      { $pull: { todolist: todoId } }
    );

    res.status(200).json({
      message: `Todo deleted successfully`,
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};