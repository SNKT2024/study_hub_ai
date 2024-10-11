"use client";
import { SignUp } from "@clerk/nextjs";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";

export default function Page() {
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
        <SignUp />
      </Box>
    </>
  );
}
