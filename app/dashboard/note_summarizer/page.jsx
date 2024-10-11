"use client";
import { Box, Container, Typography } from "@mui/material";
import Text_Summarizer from "./text/page";
import { useTheme } from "@emotion/react";

const NoteSummarizer = ({}) => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Text_Summarizer />
      </Box>
    </>
  );
};

export default NoteSummarizer;
