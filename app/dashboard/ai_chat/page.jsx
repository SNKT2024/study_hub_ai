"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hello! Welcome to Studyhub! How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [
      ...messages,
      { role: "user", text: message },
      { role: "model", text: "" },
    ];
    setMessages(newMessages);
    setMessage("");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              text: botResponse,
            },
          ];
        });
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  };

  const theme = useTheme();

  const themeStyles = {
    container: {
      width: "100%",
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 2,
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      marginTop: 5,
      padding: 3,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    messageBox: {
      fontSize: "1rem",
      fontWeight: "normal",
      backgroundColor: theme.palette.primary.main,
      color: darkMode ? "#dcdcdc" : "#ffffff",
      padding: "15px 30px",
      borderRadius: 8,
      maxWidth: "70%",
      wordWrap: "break-word",
    },
    sendButton: {
      padding: "10px 20px",
      borderRadius: 2,
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      "&:hover": {
        backgroundColor: theme.palette.secondary.contrastText,
      },
    },
    listItem: {
      backgroundColor: darkMode ? "#333" : "#f5f5f5",
      color: darkMode ? "#fff" : "#000",
      borderRadius: 8,
      margin: "8px 0",
    },
    textField: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text,
    },
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Stack
          direction={"column"} // Stack direction based on screen size
          spacing={3}
          width="100%"
          justifyContent="space-between"
          mt={5}
        >
          <Typography textAlign={"center"} variant="h4" color="secondary">
            AI CHAT
          </Typography>
          <Box sx={themeStyles.container}>
            <Stack
              direction="column"
              spacing={2}
              flexGrow={1}
              overflow="auto"
              sx={{
                paddingRight: 1,
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  background: darkMode ? "#555" : "#f1f1f1",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: darkMode ? "#f1f1f1" : "#007bff",
                  borderRadius: "8px",
                },
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.role === "model" ? "flex-start" : "flex-end"
                  }
                  alignItems="center"
                  lineHeight={2}
                >
                  <Box sx={themeStyles.messageBox}>
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              mt={3}
            >
              <TextField
                id="message"
                label="Type your message..."
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onKeyDown}
                sx={themeStyles.textField}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                sx={themeStyles.sendButton}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
