"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NotesIcon from "@mui/icons-material/Notes";
import RouteIcon from "@mui/icons-material/Route";
import { useRouter } from "next/navigation";

const Home_Page = ({}) => {
  const handleItemClick = (path) => {
    router.push(path);
  };
  const features = [
    {
      id: 1,
      name: "AI Chat",
      path: "/dashboard/ai_chat",
      icon: <ChatIcon color="primary" />,
    },
    {
      id: 2,
      name: "Study Suggestion",
      path: "/dashboard/study_suggestion",
      icon: <LightbulbIcon color="primary" />,
    },
    {
      id: 3,
      name: "Roadmap Maker",
      path: "/dashboard/roadmap",
      icon: <RouteIcon color="primary" />,
    },
    {
      id: 4,
      name: "Note Summarizer",
      path: "/dashboard/note_summarizer",
      icon: <NotesIcon color="primary" />,
    },
  ];

  return (
    <>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        height={"100%"}
        flexDirection={"column"}
        padding={3}
      >
        <Typography variant="h3" textAlign={"center"} color="primary">
          Welcome to Our App!
        </Typography>
        <Typography
          variant="h6"
          textAlign={"center"}
          color="textSecondary"
          mt={2}
        >
          Explore our features below to enhance your experience!
        </Typography>

        <Stack direction={{ xs: "row" }} spacing={2} mt={4}>
          {features.map((item) => (
            <Box border={"2px solid"} key={item.id} p={2} borderRadius={2}>
              <Stack alignItems="center">
                {item.icon}
                <Typography variant="h6" textAlign="center" mt={1}>
                  {item.name}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default Home_Page;
