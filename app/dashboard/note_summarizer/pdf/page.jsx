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
import { ToastContainer } from "react-toastify";

const PdfSummarizer = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file from the file input
    if (selectedFile) {
      setFile(selectedFile); // Set the file to the state
    }
  };

  const handleSummarize = async () => {
    if (!file) {
      setError("Please upload a file before summarizing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("/api/pdf_summarize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to summarize the PDF");
      }
      // Assuming API returns `summary` directly
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while summarizing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null); // Reset file state
    setSummary([]); // Clear summary state
    setError(""); // Clear error state
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
        <Box width={{ xs: "80%", md: "45%" }}>
          <Typography variant="h5" gutterBottom color="secondary">
            Input
          </Typography>
          <TextField
            label="Upload PDF you want to summarize"
            variant="filled"
            type="file"
            fullWidth
            onChange={handleFileChange} // Handle file selection
            inputProps={{ accept: "application/pdf" }} // Only accept PDFs
            sx={{
              backgroundColor: "secondary.main", // Correct theme reference
              "& .MuiFilledInput-root": {
                backgroundColor: "secondary.main",
              },
            }}
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
              onClick={handleSummarize} // Trigger the summarize process
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                "Summarize"
              )}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset} // Reset the form
            >
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
            sx={{ backgroundColor: "secondary.main" }}
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
                        <Markdown>{key + " :"}</Markdown>
                      </Typography>

                      <Typography variant="subtitle1" textAlign={"justify"}>
                        <Markdown>{value}</Markdown>
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

export default PdfSummarizer;
