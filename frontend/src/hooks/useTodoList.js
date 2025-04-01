// Sources: https://github.com/Azim-Ahmed/MERN--TODO/blob/master/todo-fronted/src/redux/actions/todosAction.js

import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


export const useTodoList = () => {
  const { selectedConversation } = useConversation();

  //  Returns all todos corresponding to conversation 

  const getAllTodos = async () => {
    try {
      const res = await fetch(`/api/todos/${selectedConversation._id}`); 
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } 
    catch (error) {
      toast.error(error.message);
    } 
  };

   //  Creates a todo corresponding to conversation 

  const createTodo = async (todoData) => {
    try {
      const res = await fetch(`/api/todos/${selectedConversation._id}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete the todo with associated ID 
  
  const deleteTodo = async (todoId) => { 
    try {
      const res = await fetch(`/api/todos/${todoId}`, { 
        method: "DELETE", 
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { getAllTodos, createTodo, deleteTodo };
};