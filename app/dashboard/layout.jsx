"use client";
import { UserProvider } from "@/context/UserContext";
import Sidenav from "../components/sidenav";
import theme from "@/theme";
import MiniDrawer2 from "../components/sidebar2";
import { useMediaQuery } from "@mui/material";
import Sidenav2 from "../components/sidebar2";
import Home_Page from "../home_page/page";

export default function DashboardLayout({ children }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <UserProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {isSmallScreen ? <Sidenav2 /> : <Sidenav />}
        <main
          style={{
            flexGrow: 1,
            padding: "20px",
            transition: "margin-left 0.3s ease", // Add smooth transition
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {children}
        </main>
      </div>
    </UserProvider>
  );
}
