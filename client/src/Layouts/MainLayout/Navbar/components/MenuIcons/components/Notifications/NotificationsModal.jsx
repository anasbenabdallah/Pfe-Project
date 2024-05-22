// PostModal.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Stack } from "@mui/system";

export const NotificationsModal = ({ open, handleClose }) => {
  const myData = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (userId) {
      axios
        .get(`http://localhost:8000/user/${userId}/notifications`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <DialogTitle variant="h5">Notifications</DialogTitle>
      </Stack>
      <Divider />
      <DialogContent sx={{ paddingTop: 0 }}>
        <List>
          {notifications.map((notification) => (
            <React.Fragment>
              <ListItem key={notification._id} disableGutters>
                <ListItemAvatar>
                  <Avatar
                    src={
                      notification?.job
                        ? notification?.job.tester?.picturePath
                        : myData.picturePath
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h5">
                        {notification.job
                          ? notification?.job.tester?.companyName
                          : myData.firstname}
                      </Typography>
                      <Typography variant="body1" noWrap>
                        {notification.message}
                        <Typography component="span" fontWeight="bold">
                          {notification.job ? notification.job.title : ""}
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
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
