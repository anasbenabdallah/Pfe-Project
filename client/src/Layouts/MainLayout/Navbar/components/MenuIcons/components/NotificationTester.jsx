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
  ListItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme } from "@mui/material/styles";
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (userId) {
      axios
        .get(`http://localhost:8000/tester/tester/${userId}/notifications`, {
          withCredentials: true,
        })
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      // redirect to login page if userId is not found in localStorage
      console.log("hey");
    }
  }, []);
  console.log(notifications);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function timeSince(date) {
    const providedDate = new Date(date);
    const currentDate = new Date();
    const elapsed = currentDate.getTime() - providedDate.getTime();
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} `;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} `;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} `;
    } else {
      return "just now";
    }
  }
  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: theme.palette.primary.main }} // Apply the primary main color for the icon
      >
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 380,
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
          {notifications.map(
            (notification) =>
              notification.user && (
                <div key={notification._id}>
                  <ListItemButton onClick={handleClose}>
                    <ListItemAvatar>
                      <Avatar src={notification?.user?.picturePath} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="h6" fontWeight={"bold"}>
                            {notification?.user.firstname}{" "}
                            {notification?.user.lastname}
                          </Typography>
                          <Typography component="span">
                            {notification.message}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={`sent ${timeSince(
                        notification.createdAt
                      )} ago`}
                    />
                  </ListItemButton>
                  <Divider />
                </div>
              )
          )}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                pb: 1,
              }}
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
    </div>
  );
};

export default NotificationBell;
