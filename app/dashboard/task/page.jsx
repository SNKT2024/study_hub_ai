"use client";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Add_Task from "./add_task";
import { ToastContainer } from "react-toastify";
import Showtask from "./showtask";
import useTasks from "@/hooks/useTasks";
import { useUser } from "@clerk/nextjs";
import EditTask from "@/app/components/modal/editTask";
import DeleteTask from "@/app/components/modal/deleteTask";

const TaskPage = ({}) => {
  const theme = useTheme();
  const { user } = useUser();
  const { tasks, addTask, deleteTask, fetchTasks } = useTasks(user?.id);

  const [editTaskId, setEditTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (taskId) => {
    setEditTaskId(taskId);
    setIsEditModalOpen(true);
  };

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTaskId(null);
    fetchTasks();
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    fetchTasks();
    setDeleteTaskId(null);
  };
  return (
    <>
      <Box
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{
          backgroundColor: theme.palette.secondary.main,
        }}
        mt={{ xs: 10, lg: 0 }}
      >
        <Typography variant="h4" color="primary" align="center" mt={15}>
          TASK MANAGER
        </Typography>
        <Stack
          height={"90%"}
          width={"90%"}
          alignItems="center"
          justifyContent="center"
          gap={2}
          direction={{ xs: "column", sm: "row" }}
          p={2}
        >
          <Add_Task addTask={addTask} />
          <Showtask tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </Stack>
      </Box>

      {isEditModalOpen && (
        <EditTask taskId={editTaskId} onClose={closeEditModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteTask
          taskId={deleteTaskId}
          taskTitle={tasks.find((task) => task._id === deleteTaskId)?.taskTitle}
          onClose={closeDeleteModal}
          onDelete={deleteTask}
        />
      )}
    </>
  );
};

export default TaskPage;
