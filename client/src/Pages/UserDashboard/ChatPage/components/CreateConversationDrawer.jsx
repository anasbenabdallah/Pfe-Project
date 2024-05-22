import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../../redux/actions/UserAction";
import { CreateConversation } from "../../../../redux/actions/ConversationAction";

export default function CreateConversationDrawer() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.User.users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers()).catch(() => console.log("Error loading posts"));
  }, [dispatch]);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleTextFieldClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user._id;

  const handleUserClick = (user) => {
    setSelectedUser(user);
    let data = { senderId: currentUserId, receiverId: user._id };
    console.log("jawna bh", data);
    dispatch(CreateConversation(data)).then(() => {
      setState({ ...state, left: false });
    });
    console.log("bana", user);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
    >
      <List>
        <ListItem>
          <TextField fullWidth onClick={handleTextFieldClick} />
        </ListItem>
        {users.map((user) => (
          <ListItemButton key={user._id} onClick={() => handleUserClick(user)}>
            <ListItem
              key={user.id}
              alignItems="flex-start"
              sx={{ alignItems: "center" }}
            >
              <ListItemAvatar>
                <Avatar src={user.picturePath} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack flexDirection={"row"} columnGap={"0.2rem"}>
                    <Typography variant="h6">{user.firstname}</Typography>
                    <Typography variant="h6">{user.lastname}</Typography>
                  </Stack>
                }
              />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("left", true)}
        style={{ pointerEvents: state.left ? "none" : "auto" }}
      >
        <AddIcon label="Open Left Sidebar" variant="outlined" />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
