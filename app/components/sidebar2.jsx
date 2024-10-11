"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NotesIcon from "@mui/icons-material/Notes";
import RouteIcon from "@mui/icons-material/Route";

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

const drawerWidth = 280;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

const sidebarItems = [
  {
    id: 1,
    name: "Home",
    icon: <HomeIcon color="secondary" />,
    path: "/dashboard/home",
  },
  {
    id: 2,
    name: "Friends",
    icon: <EmojiPeopleIcon color="secondary" />,
    path: "/dashboard/friends",
  },

  {
    id: 3,
    name: "Video Call",
    icon: <VideoCameraFrontIcon color="secondary" />,
    path: "/dashboard/video_call",
  },
  {
    id: 4,
    name: "Tasks",
    icon: <AssignmentIcon color="secondary" />,
    path: "/dashboard/task",
  },
  {
    id: 5,
    name: "AI Chat",
    icon: <ChatIcon color="secondary" />,
    path: "/dashboard/ai_chat",
  },
  {
    id: 8,
    name: "Study Recommendations",
    icon: <LightbulbIcon color="secondary" />,
    path: "/dashboard/study_suggestion",
  },
  {
    id: 9,
    name: "Roadmap Maker",
    icon: <RouteIcon color="secondary" />,
    path: "/dashboard/roadmap",
  },
  {
    id: 10,
    name: "Note Summarizer",
    icon: <NotesIcon color="secondary" />,
    path: "/dashboard/note_summarizer",
  },
];

export default function Sidenav2() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest(".MuiDrawer-root")) {
        handleDrawerClose();
      }
    };
    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleItemClick = (path) => {
    router.push(path);
    if (open) {
      setOpen(false); // Close the drawer when an item is clicked
    }
  };

  return (
    <>
      {isSmallScreen && (
        <Box sx={{ position: "absolute", top: 16, left: 16 }}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon color="secondary" />
          </IconButton>
        </Box>
      )}

      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }} // Better performance on mobile
      >
        {" "}
        <DrawerHeader sx={{ alignItems: "center", justifyContent: "center" }}>
          <List>
            <Image
              src={"/assets/img/logo/logo.png"}
              alt="logo"
              width={50}
              height={50}
              style={{ alignItems: "center" }}
            />
          </List>
        </DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon color="secondary" />
          ) : (
            <ChevronLeftIcon color="secondary" />
          )}
        </IconButton>
        <Divider
          sx={
            ({ opacity: "0.5" },
            { backgroundColor: theme.palette.secondary.main })
          }
        />
        <Typography
          textAlign="center"
          mt={2}
          color="secondary"
          variant="button"
        >
          Main
        </Typography>
        <List>
          {sidebarItems.slice(0, 1).map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon || <HomeIcon />}{" "}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    style: { color: theme.palette.secondary.main },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {sidebarItems.slice(3, 4).map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon || <HomeIcon />}{" "}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    style: { color: theme.palette.secondary.main },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={
            ({ opacity: "0.5" },
            { backgroundColor: theme.palette.secondary.main })
          }
        />
        <Typography
          textAlign="center"
          mt={2}
          color="secondary"
          variant="button"
        >
          AI
        </Typography>
        <List>
          {sidebarItems.slice(4, 10).map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon || <HomeIcon />}{" "}
                  {/* Default icon if none provided */}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    style: { color: theme.palette.secondary.main },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={
            ({ opacity: "0.5" },
            { backgroundColor: theme.palette.secondary.main })
          }
        />
        <Typography
          textAlign="center"
          mt={2}
          color="secondary"
          variant="button"
        >
          COMING SOON
        </Typography>
        <List>
          {sidebarItems.slice(1, 3).map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon || <HomeIcon />}{" "}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    style: { color: theme.palette.secondary.main },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={
            ({ opacity: "0.5" },
            { backgroundColor: theme.palette.secondary.main })
          }
        />
        <List>
          <ListItem
            sx={{
              minHeight: 48,
              justifyContent: open ? "center" : "inital",
              px: 2.5,
              transition: "justify-content 0.3 ease",
            }}
          >
            <UserButton />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
