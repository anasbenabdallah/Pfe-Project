import { useState, useEffect } from "react";
import {
  IconButton,
  Badge,
  Menu,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItem,
  Stack,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { NotificationsModal } from "./NotificationsModal";
import { useTheme } from "@mui/material/styles";

const NotificationBell = () => {
  const myData = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (userId) {
      axios
        .get(`http://localhost:8000/user/${userId}/notifications`, {
          withCredentials: true,
        })
        .then((response) => {
          const sortedNotifications = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setNotifications(sortedNotifications);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      console.log("User ID not found, redirecting to login page.");
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const timeSince = (date) => {
    const providedDate = new Date(date);
    const currentDate = new Date();
    const elapsed = currentDate.getTime() - providedDate.getTime();
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return "just now";
    }
  };

  const [notificationModal, setOpenNotificationModal] = useState(false);

  const handleClickOpenModalNotification = () => {
    setOpenNotificationModal(true);
  };

  const handleCloseModalNotification = () => {
    setOpenNotificationModal(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: theme.palette.primary.main }}
      >
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 320,
            maxWidth: 380,
            "& .MuiAvatar-root": {
              width: 45,
              height: 45,
              mr: 1.5,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Stack flexDirection={"row"} columnGap={1}>
                  <Typography variant="h4">Notifications</Typography>
                </Stack>
              }
            />
          </ListItem>
          <Divider />
          {notifications.map((notification) => (
            <React.Fragment key={notification._id}>
              <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      notification?.event
                        ? notification?.event.tester?.picturePath
                        : notification?.picturePath
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h5">
                        {notification.event
                          ? notification?.event.tester?.testerName
                          : ""}
                      </Typography>
                      <Typography variant="body1" noWrap>
                        {notification.message} <br />
                        <Typography component="span" fontWeight="bold">
                          {notification.event ? notification.event.title : ""}
                        </Typography>
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Box>{`sent ${timeSince(
                        notification.createdAt
                      )} ago`}</Box>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                pb: 1,
              }}
              onClick={handleClickOpenModalNotification}
            >
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <Typography
                      color="primary"
                      variant="body1"
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      View all notifications
                    </Typography>
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
      <NotificationsModal
        open={notificationModal}
        handleClose={handleCloseModalNotification}
      />
    </div>
  );
};

export default NotificationBell;
