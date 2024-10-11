"use client";
import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";

const Study_Suggestion = () => {
  const theme = useTheme();
  const [inputSubject, setInputSubject] = useState("");
  const [inputProblem, setInputProblem] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();

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

  const handleReset = () => {
    setInputSubject("");
    setInputProblem("");
    setSuggestion(null);
    setError(null);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSuggestion();
    }
  };

  const saveSuggestion = async () => {
    if (!suggestion) {
      console.error("No suggestion to save.");
      return;
    }

    try {
      const response = await fetch("/api/save_suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id, ...suggestion }),
      });

      if (!response.ok) {
        throw new Error("Failed to save suggestion");
      }

      const result = await response.json();
      showSuccessToast("Suggestion saved successfully");
    } catch (error) {
      console.error("Error saving suggestion:", error);
      showErrorToast("Failed to save suggestion");
    }
  };

  const handleSuggestion = async () => {
    if (!inputSubject.trim() || !inputProblem.trim()) {
      showErrorToast("Please enter both subject and problem!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: inputSubject,
          problem: inputProblem,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestion");
      }

      const data = await response.json();

      // Extract the first suggestion object from the array
      if (data && data.length > 0) {
        setSuggestion(data[0]);
      } else {
        setSuggestion(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        gap={3}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"90vh"}
        width={"90vw"}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "column",
          },
        }}
      >
        {/* <Button color="secondary" variant="outlined">
          Show Saved Suggestions
        </Button> */}
        <Typography textAlign={"center"} variant="h4" color="secondary">
          Study Suggestions
        </Typography>
        <Box width={{ xs: "80%", md: "45%" }}>
          <TextField
            label="Enter a topic or subject"
            multiline
            rows={3}
            variant="filled"
            fullWidth
            value={inputSubject}
            onChange={(e) => setInputSubject(e.target.value)}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              "& .MuiFilledInput-root": {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          />
          <TextField
            label="Describe the problem or doubt"
            multiline
            rows={3}
            variant="filled"
            fullWidth
            value={inputProblem}
            onChange={(e) => setInputProblem(e.target.value)}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              "& .MuiFilledInput-root": {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
            onKeyDown={onKeyDown}
          />
          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSuggestion}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                "Get Suggestions"
              )}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
        </Box>

        {/* Display Suggestion */}
        {suggestion && (
          <Box
            component={Paper}
            elevation={3}
            width={{ xs: "90%", md: "45%" }}
            padding={3}
            mt={3}
            sx={{ backgroundColor: theme.palette.secondary.main }}
            overflow={"scroll"}
          >
            {/* <Button sx={{ mb: 2 }} variant="contained" onClick={saveSuggestion}>
              Save Sugeestion
            </Button> */}
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Subject: {suggestion.subject}
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              mt={2}
              gutterBottom
              textAlign={"justify"}
            >
              <strong>Easy Explanation:</strong> {suggestion.easyExplanation}
            </Typography>
            <Typography variant="body1" mt={2} gutterBottom>
              <strong>Detailed Solution:</strong> {suggestion.detailedSolution}
            </Typography>

            {/* Render Study Methods */}
            <Typography variant="body1" mt={2} gutterBottom>
              <strong>Study Methods:</strong>
              <ul>
                {suggestion.studyMethods.map((method, index) => (
                  <li key={index}>
                    <Typography variant="body2">
                      <strong>{method.name}</strong> {method.content}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Typography>

            {/* Render Books */}
            <Typography variant="body1" mt={2} gutterBottom>
              <strong>Books:</strong>
              <ul>
                {suggestion.books.map((book, index) => (
                  <li key={index}>
                    <Typography variant="body2">{book.name}</Typography>
                  </li>
                ))}
              </ul>
            </Typography>
          </Box>
        )}
      </Stack>
      <ToastContainer />
    </Box>
  );
};

export default Study_Suggestion;
