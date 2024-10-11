// hooks/useTasks.js
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useTasks = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/task?clerkId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to add a new task
  const addTask = async (newTask) => {
    if (!user) return;

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id, ...newTask }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Optionally, re-fetch tasks after adding a new one
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit Task

  const editTask = async (taskId, updatedTask) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/task?taskId=${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to edit task");
      }

      // Re-fetch tasks after editing
      await fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete Task

  const deleteTask = async (taskId) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/task?taskId=${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Re-fetch tasks after deletion
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return { tasks, addTask, editTask, deleteTask, fetchTasks };
};

export default useTasks;
