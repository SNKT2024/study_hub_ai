"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/assets/img/logo/logo.png";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignOutButton,
  SignUp,
} from "@clerk/nextjs";

export default function Login_Page() {
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
        <SignIn />
      </Box>
    </>
  );
}
