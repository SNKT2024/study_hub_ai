"use client";
import { useUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Modal,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useTasks from "@/hooks/useTasks"; // Import your custom hook

const EditTask = ({ taskId, onClose }) => {
  const theme = useTheme();
  const { tasks, editTask, fetchTasks } = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Style for the modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "secondary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // Find the task by ID and set the current task details
    const task = tasks.find((task) => task._id === taskId);
    if (task) {
      setTaskTitle(task.taskTitle);
      setDescription(task.description);
      setDueDate(task.dueDate.split("T")[0]); // Format date for input
    }
  }, [taskId, tasks]);

  const handleEditTask = async (e) => {
    e.preventDefault();
    await editTask(taskId, { taskTitle, description, dueDate });
    onClose(); // Close the modal after saving
  };

  return (
    <Modal open={Boolean(taskId)} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" align="center">
          Edit Task
        </Typography>
        <form onSubmit={handleEditTask}>
          <TextField
            placeholder="Task Title"
            onChange={(e) => setTaskTitle(e.target.value)}
            fullWidth
            value={taskTitle}
            label="Task Title"
            margin="normal"
            required
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
            required
          />
          <Button
            type="submit"
            sx={{ display: "block", mt: 1 }}
            variant="contained"
          >
            Save
          </Button>
        </form>
        <ToastContainer position="top-center" />
      </Box>
    </Modal>
  );
};

export default EditTask;
