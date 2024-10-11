"use client";
import { useUser } from "@clerk/nextjs";
import { Box, Button, TextField, useTheme } from "@mui/material";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"; // Ensure this import is present

const Add_Task = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-center",
    });
  };

  // const handleAddTask = async (e) => {
  //   e.preventDefault();
  //   if (!taskTitle || !description || !dueDate) {
  //     showErrorToast("Please fill in all the details");
  //     return;
  //   }
  //   const newTask = { taskTitle, description, dueDate };
  //   try {
  //     const response = await fetch("/api/task", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ clerkId: user.id, ...newTask }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add task");
  //     }

  //     await response.json();
  //     showSuccessToast("Task Added Succesfully");
  //     setTaskTitle("");
  //     setDescription("");
  //     setDueDate("");
  //   } catch (error) {
  //     showErrorToast(error.message);
  //   }
  // };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle || !description || !dueDate) {
      showErrorToast("Please fill in all the details");
      return;
    }

    try {
      await addTask({ taskTitle, description, dueDate });
      showSuccessToast("Task Added Successfully");

      setTaskTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  return (
    <Box maxWidth={"100%"}>
      <form onSubmit={handleAddTask}>
        <TextField
          placeholder="Add Task Title"
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
          value={taskTitle}
          label="Task Title"
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          margin="normal"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          type="submit"
          sx={{ display: "block", mt: 1 }}
          variant="contained"
        >
          Add Task
        </Button>
      </form>
      <ToastContainer position="top-right" /> {/* Ensure proper positioning */}
    </Box>
  );
};

export default Add_Task;
