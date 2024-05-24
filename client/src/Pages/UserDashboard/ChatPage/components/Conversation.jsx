import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import { formatDistance } from "date-fns";

import { useSelector, useDispatch } from "react-redux";
import {
  getMessages,
  CreateMessage,
} from "../../../../redux/actions/MessagesAction";

import { Avatar, ListItemAvatar, Stack, Typography } from "@mui/material";

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "100vh",
    position: "fixed",
    overflow: "auto",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "82vh",
    overflowY: "auto",
  },
});

const Conversation = ({ conversationId, socket, otherUser }) => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user._id;
  const currentUser = user;

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.Message.messages);

  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState([]);

  useEffect(() => {
    dispatch(getMessages(conversationId));
    setArrivalMessage(messages);
    console.log("arrivalmessages", arrivalMessage);
  }, [dispatch, conversationId, otherUser]);

  // Set up socket.io connection and listen for incoming messages
  useEffect(() => {
    socket.off("getMessage");
    console.log("creatinlistener");
    socket.on(
      "getMessage",
      (data) => {
        console.log("messagedata", data.message);
        setArrivalMessage((prec) => [...prec, data]);
        console.log(data);
      },
      [socket]
    );

    socket.emit("addUser", currentUserId);

    socket.on("getUsers", (users) => {
      console.log("users", users);
    });
  }, [currentUserId]);

  const handleCreateMessage = async (event) => {
    event.preventDefault();
    const newMessage = {
      sender: {
        _id: user._id,
        firstname: user.firstname,
        picturePath: user.picturePath,
      },
      receiverId: otherUser.id,
      message: message,
      createdAt: new Date(),
    };

    socket.emit("sendMessage", newMessage);
    console.log("Sent message:", message);

    dispatch(
      CreateMessage(conversationId, message, currentUserId, otherUser.id)
    );
    console.log("otheruser", otherUser);

    // Update the state to include the new message
    setArrivalMessage((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };
  return (
    <div>
      {arrivalMessage.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40vh 0vh" }}>
          <Typography variant="h4" color={"gray"} sx={{ opacity: "50%" }}>
            Open a conversation to start a chat
          </Typography>
        </div>
      ) : (
        <List className={classes.messageArea}>
          {arrivalMessage.map((message, index) => {
            return (
              <ListItem key={index}>
                <Grid container>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        {message.sender._id === currentUserId ? (
                          <ListItemText
                            align="right"
                            primary={message.message}
                            secondary={formatDistance(
                              new Date(message.createdAt),
                              new Date(),
                              { addSuffix: true }
                            )}
                          />
                        ) : (
                          <React.Fragment>
                            <Stack flexDirection={"row"} alignItems={"center"}>
                              {message.sender.picturePath && (
                                <ListItemAvatar>
                                  <Avatar src={message.sender.picturePath} />
                                </ListItemAvatar>
                              )}
                              <ListItemText
                                align="left"
                                primary={message.message}
                                secondary={formatDistance(
                                  new Date(message.createdAt),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              />
                            </Stack>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      )}

      <form onSubmit={handleCreateMessage}>
        <Grid
          container
          sx={{
            position: "fixed",
            bottom: 0,
            width: "75%",
            padding: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={11}>
            <TextField
              id="messageInput"
              label="Type Something"
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={(event) => handleCreateMessage(event)}
              type="submit"
            >
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Conversation;
