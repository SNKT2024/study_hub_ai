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
import GroupIcon from "@mui/icons-material/Group";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import NotesIcon from "@mui/icons-material/Notes";
import RouteIcon from "@mui/icons-material/Route";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { ListSubheader, Typography } from "@mui/material";
import { UserProfile } from "@clerk/nextjs";
import logo from "../../assets/img/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const drawerWidth = 280;
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      name: "Groups",
      icon: <GroupIcon color="secondary" />,
      path: "/dashboard/groups",
    },
    {
      id: 4,
      name: "Video Call",
      icon: <VideoCameraFrontIcon color="secondary" />,
      path: "/dashboard/video_call",
    },
    {
      id: 5,
      name: "Task & Assignments",
      icon: <AssignmentIcon color="secondary" />,
      path: "/dashboard/task_assignments",
    },
    {
      id: 6,
      name: "AI Chat",
      icon: <ChatIcon color="secondary" />,
      path: "/dashboard/ai_chat",
    },
    {
      id: 7,
      name: "Study Recommendations",
      icon: <LightbulbIcon color="secondary" />,
      path: "/dashboard/study_recommendations",
    },
    {
      id: 8,
      name: "Roadmap Maker",
      icon: <RouteIcon color="secondary" />,
      path: "/dashboard/roadmap_maker",
    },
    {
      id: 9,
      name: "Note Summarizer",
      icon: <NotesIcon color="secondary" />,
      path: "/dashboard/note_summarizer",
    },
    {
      id: 10,
      name: "Profile",
      icon: <AccountBoxIcon color="secondary" />,
      path: "/user-profile",
    },
  ];

  const router = useRouter();

  return (
    <Drawer variant="permanent" open={open} sx={{ width: drawerWidth }}>
      <DrawerHeader sx={{ alignItems: "center", justifyContent: "center" }}>
        <List>
          <Image
            src={logo}
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
      <Divider color={theme.palette.secondary.main} sx={{ opacity: "0.5" }} />

      <Typography textAlign="center" mt={2} color="secondary" variant="button">
        Main
      </Typography>

      <List>
        {sidebarItems.slice(0, 4).map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
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
      <Divider color={theme.palette.secondary.main} sx={{ opacity: "0.5" }} />
      <Typography textAlign="center" mt={2} color="secondary" variant="button">
        AI
      </Typography>
      <List>
        {sidebarItems.slice(5, 9).map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
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
      <Divider color={theme.palette.secondary.main} sx={{ opacity: "0.5" }} />

      <List>
        {sidebarItems.slice(9).map((item) => (
          <Link href={item.path} key={item.id} passHref>
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
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
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
