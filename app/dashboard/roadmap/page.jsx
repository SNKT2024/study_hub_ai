"use client";
import { useCallback, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
} from "@mui/material";
import Markdown from "react-markdown";
import { useTheme } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import CircleIcon from "@mui/icons-material/Circle";

import "@xyflow/react/dist/style.css";

const Roadmap_Maker = () => {
  const theme = useTheme();
  const [inputText, setInputText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showToastMessage = () => {
    toast.error("Please enter some text or topic to generate roadmap for!", {
      position: "top-center", // Use string directly
    });
  };

  const initialNodes = [];
  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleRoadmap = async () => {
    if (!inputText.trim()) {
      showToastMessage();
      return; // Return early if input is empty
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: inputText,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roadmap");
      }

      const data = await response.json();
      console.log(data);
      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputText("");
    setNodes([]);
    setEdges([]);
    setError(null);
  };

  return (
    <Box>
      <Stack
        gap={3}
        height={"90vh"}
        width={"90vw"}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
          },
        }}
        mt={7}
      >
        <Box>
          <Typography
            textAlign={"center"}
            mb={4}
            variant="h4"
            color="secondary"
          >
            Roadmap Maker
          </Typography>
          <TextField
            label="Enter a topic to generate a roadmap for"
            multiline
            rows={5}
            variant="filled"
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            sx={{
              backgroundColor: theme.palette.secondary.main, // Use a color from the theme palette
              "& .MuiFilledInput-root": {
                backgroundColor: theme.palette.secondary.main, // Ensure consistent styling for filled variant
              },
            }}
          />
          <Stack
            direction="row"
            spacing={20}
            mt={2}
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={handleRoadmap}
            >
              {loading ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                "Generate"
              )}
            </Button>
            {/* <Button variant="contained" color="secondary">
              Save Note
            </Button> */}
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
          <Box mt={2}>
            <Typography color="secondary" variant="subtitle1">
              Instructions:
            </Typography>
            {/* <List>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText>
                  <Typography variant="subititle2" color="secondary">
                    Roadmap maker does not work on mobile devices, please use
                    desktop or laptop
                  </Typography>
                </ListItemText>
              </ListItem>
            </List> */}
          </Box>
        </Box>

        <Box
          width={{ xs: "80%", md: "45%", lg: "90%" }}
          sx={{ overflowY: "auto" }}
          height={"90vh"}
        >
          <Box height={"100%"} width={"100%"}>
            <ReactFlow nodes={nodes} edges={edges}>
              <Background />
              <Controls />
            </ReactFlow>
          </Box>
        </Box>
      </Stack>
      <ToastContainer />
    </Box>
  );
};

export default Roadmap_Maker;
