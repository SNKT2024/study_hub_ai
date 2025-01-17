"use client";
import { Inter } from "next/font/google";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ClerkProvider
        appearance={{
          baseTheme: [dark, neobrutalism],
          variables: {
            colorPrimary: theme.palette.secondary.main,
            colorBackground: theme.palette.secondary.main,
            colorTextOnPrimaryBackground: theme.palette.primary.main,
            colorText: theme.palette.primary.main,
            colorInputText: "white",
          },
          userProfile: {
            baseTheme: [dark, shadesOfPurple],
            variables: {
              colorText: theme.palette.secondary.main,
              colorTextOnPrimaryBackground: theme.palette.secondary.main,
              colorBackground: theme.palette.primary.main,
            },
          },
          userButton: {
            variables: {
              colorPrimary: theme.palette.primary.main,
              colorBackground: theme.palette.primary.main,
              colorTextOnPrimaryBackground: theme.palette.secondary.main,
              colorText: theme.palette.secondary.main,
              colorTextSecondary: theme.palette.secondary.main,
            },
          },
        }}
      >
        <html lang="en">
          <head>
            <title>StudyHub</title>
            <meta name="Created using Next Js" content="Description" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </head>{" "}
          <body className={inter.className}>
            {children}
            <Analytics />
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
