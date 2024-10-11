"use client";
import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import Markdown from "react-markdown";
import { useTheme } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextSummarizer = () => {
  const theme = useTheme();
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showToastMessage = () => {
    toast.error("Please enter some text or topic to summarize!", {
      position: "top-center", // Use string directly
    });
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      showToastMessage();
      return; // Return early if input is empty
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/text_summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "paragraph",
          length: 200,
          text: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while summarizing the text.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputText("");
    setSummary([]);
    setError(null);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSummarize();
    }
  };

  const handleSavenotes = () => {};

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
        <Typography textAlign={"center"} variant="h4" color="secondary">
          Note Summarizer
        </Typography>
        <Box width={{ xs: "80%", md: "45%" }}>
          <TextField
            label="Enter text or topic you want to summarize"
            multiline
            rows={10}
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
              onClick={handleSummarize}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                "Summarize"
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
        </Box>

        <Box width={{ xs: "80%", md: "45%" }} sx={{ overflowY: "auto" }}>
          <Box
            border={2}
            borderColor="primary"
            borderRadius={4}
            p={2}
            minHeight="200px"
            sx={{ backgroundColor: theme.palette.secondary.main }}
          >
            {summary.length > 0 ? (
              summary.map((section, index) => (
                <Box key={index} mb={2} p={3}>
                  <Typography
                    variant="h4"
                    mb={3}
                    textAlign={"center"}
                    fontWeight={700}
                  >
                    {section.header}
                  </Typography>

                  {Object.entries(section.summary).map(([key, value]) => (
                    <Box key={key} mb={1} p={2}>
                      <Typography variant="h6" mb={1} fontWeight={600}>
                        <Markdown>{value.header + " :"}</Markdown>
                      </Typography>

                      <Typography variant="subtitle1" textAlign={"justify"}>
                        <Markdown>{value.content}</Markdown>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Typography color="primary">
                Summary will appear here...
              </Typography>
            )}
          </Box>
        </Box>
      </Stack>

      <ToastContainer />
    </Box>
  );
};

export default TextSummarizer;
