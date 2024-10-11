"use client";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";

const Showtask = ({ tasks, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <Box width={"100%"} overflow={"scroll"}>
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: theme.palette.secondary.main }}
              >
                Due Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: theme.palette.secondary.main }}
              >
                Task
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: theme.palette.secondary.main }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: theme.palette.secondary.main }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell
                    align="center"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {task.dueDate}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {task.taskTitle}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {task.description}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mb: { xs: 1, sm: 0 } }}
                      onClick={() => onEdit(task._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1 }}
                      onClick={() => onDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No tasks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Showtask;
