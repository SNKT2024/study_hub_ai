"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NotesIcon from "@mui/icons-material/Notes";
import RouteIcon from "@mui/icons-material/Route";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/img/logo/logo.png";

const Home_Page = () => {
  const handleItemClick = (path) => {
    router.push(path);
  };

  const router = useRouter();
  const theme = useTheme();
  const paths = [
    {
      id: 1,
      name: "AI Chat",
      path: "/dashboard/ai_chat",
      icon: <ChatIcon color="secondary" />,
    },
    {
      id: 2,
      name: "Study Suggestion",
      path: "/dashboard/study_suggestion",
      icon: <LightbulbIcon color="secondary" />,
    },
    {
      id: 3,
      name: "Roadmap Maker",
      path: "/dashboard/roadmap",
      icon: <RouteIcon color="secondary" />,
    },
    {
      id: 4,
      name: "Note Summarizer",
      path: "/dashboard/note_summarizer",
      icon: <NotesIcon color="secondary" />,
    },
  ];

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      height={"100%"}
      flexDirection={"column"}
    >
      <Stack spacing={3} alignItems={"center"} justifyContent={"center"} p={3}>
        <Image src={logo} alt="logo" width={150} height={150} />
        <Typography variant="h3" color={theme.palette.secondary.main}>
          Transform Your Study Sessions with StudyHub
        </Typography>
        <Typography variant="h6" color={theme.palette.secondary.main}>
          Connect, Collaborate, and Learn Smarter with AI-Powered Tools.
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} mt={2}>
        {paths.map((item) => (
          <Box
            border={"1px solid"}
            key={item.id}
            p={1}
            flexDirection={{ xs: "column" }}
            display={"flex"}
            sx={{ backgroundColor: theme.palette.secondary.main }}
            borderRadius={3}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "4" }}
              onClick={() => handleItemClick(item.path)}
            >
              <Stack alignItems="center">
                {item.icon}
                <Typography variant="h6" color="secondary">
                  {item.name}
                </Typography>
              </Stack>
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Home_Page;
