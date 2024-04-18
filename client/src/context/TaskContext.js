import React, { useState, useEffect, useContext, createContext } from "react";
import { TokenStatusContext } from "./tokenStatus";

const TaskContext = createContext();
const dev_URL = process.env.REACT_APP_DEV_URL;

export function TaskContextFun(props) {
  const { getAuthToken } = TokenStatusContext();
  const [tasks, setTasks] = useState([]);

  // Function to fetch all tasks
  async function fetchAllTasks() {
    try {
      const response = await fetch(`${dev_URL}/api/task/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
      // return fetchedTasks;
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  }

  // Function to delete a task
  async function handleDeleteTask(id) {
    try {
      const response = await fetch(`${dev_URL}/api/task/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchAllTasks(); // Refresh tasks after deletion
      return { success: true, message: "Task has been deleted!" };
    } catch (error) {
      console.error("Error deleting Task:", error);
      return { success: false, message: error.message };
    }
  }

  // Function to edit an existing task
  async function handleEditTask(id, title, description, tag) {
    try {
      const response = await fetch(`${dev_URL}/api/task/updateTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchAllTasks(); // Refresh tasks after update
      return { success: true, message: "Task has been Edited!" };
    } catch (error) {
      console.error("Error updating Task:", error);
      return { success: false, message: error.message };
    }
  }

  // Function to add a new note
  async function handleAddNote(title, description, tag) {
    try {
      const response = await fetch(`${dev_URL}/api/task/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchAllTasks(); // Refresh tasks after adding note
      return { success: true, message: "Task has been stored in the basket!" };
    } catch (error) {
      console.error("Error adding Note:", error);
      return { success: false, message: error.message };
    }
  }

   // Function to assign a task
   async function handleAssignTask(id) {
    console.log("Assigning task with ID:", id);
    try {
      const response = await fetch(`${dev_URL}/api/task/assignTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getAuthToken(), // Assuming getAuthToken() retrieves the authentication token
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // If you want to parse response body, uncomment the next line
      // const data = await response.json();
  
      // Refresh tasks after assignment
      fetchAllTasks();
  
      return { success: true, message: "Task has been assigned!" };
    } catch (error) {
      console.error("Error assigning task:", error.message);
      return { success: false, message: error.message };
    }
  }
  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchAllTasks,
        handleDeleteTask,
        handleEditTask,
        handleAddNote,
        handleAssignTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}

export function UserTasks() {
  return useContext(TaskContext);
}
