"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import logo from "../../public/assets/img/logo/logo.png";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default function Welcome_Page() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {" "}
        <Stack
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
          p={3}
        >
          <Image src={logo} alt="logo" width={150} height={150} />
          <Typography variant="h3" color={theme.palette.secondary.main}>
            Transform Your Study Sessions with StudyHub
          </Typography>
          <Typography variant="h6" color={theme.palette.secondary.main}>
            Connect, Collaborate, and Learn Smarter with AI-Powered Tools.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
            }}
            onClick={() => router.push("/sign-in")}
          >
            Get Started
          </Button>
        </Stack>
      </Box>
    </>
  );
}
