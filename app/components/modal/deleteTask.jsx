"use client";
import useTasks from "@/hooks/useTasks";
import { useUser } from "@clerk/nextjs";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const DeleteTask = ({ taskId, taskTitle, onClose, onDelete }) => {
  const theme = useTheme();
  const { user } = useUser();

  const handleDeleteTask = async () => {
    if (!user || !taskId) return;
    try {
      await onDelete(taskId); // Call the delete function passed as a prop
      toast.success("Task deleted successfully!"); // Notify user of success
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete the task."); // Notify user of error
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.secondary.main,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={!!taskId} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography align="center" mb={2}>
          Are you sure you want to delete the task: <strong>{taskTitle}</strong>
          ?
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Box>
        <ToastContainer position="top-center" />
      </Box>
    </Modal>
  );
};

export default DeleteTask;
