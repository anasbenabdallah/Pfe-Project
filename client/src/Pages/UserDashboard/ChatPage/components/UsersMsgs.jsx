import { useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider, List, TextField } from "@mui/material";
import { formatDistance, isValid } from "date-fns";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../../../../redux/actions/ConversationAction";
import { getMessages } from "../../../../redux/actions/MessagesAction";
import CreateConversationDrawer from "./CreateConversationDrawer";

const UsersMsgs = ({ onConversationSelect }) => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state) => state.Conversation.conversations
  );
  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  return (
    <div
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: "100%",
        overflow: "auto",
      }}
    >
      <div sx={{ height: "100vh" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            height: "calc(100vh - 64px)",
            overflow: "auto",
          }}
          subheader={<li />}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Chats</Typography>
            <CreateConversationDrawer />
          </ListItem>
          {conversations.map((conversation) => {
            const otherUser = conversation.members.find(
              (member) => member.id !== userId
            );
            if (!otherUser) {
              return null; // Maybe log or handle differently if needed
            }

            const latestMessage =
              conversation.latestMessage || "No new messages";
            const createdAt = conversation.createdAt
              ? new Date(conversation.createdAt)
              : new Date();

            return (
              <React.Fragment key={conversation.conversationId}>
                <ListItemButton
                  onClick={() => {
                    console.log(
                      "conversation id:",
                      conversation.conversationId
                    );
                    dispatch(getMessages(conversation.conversationId));
                    onConversationSelect(
                      conversation.conversationId,
                      otherUser
                    );
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={otherUser.picturePath} />{" "}
                      {/* Make sure this exists */}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack flexDirection={"row"} columnGap={"0.2rem"}>
                          <Typography variant="h6">
                            {otherUser.firstname}
                          </Typography>
                          <Typography variant="h6">
                            {otherUser.lastname}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <React.Fragment>
                          <Stack
                            flexDirection={"row"}
                            columnGap={1}
                            alignItems={"flex-end"}
                          >
                            <Typography
                              sx={{ display: "inline" }}
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {latestMessage}
                            </Typography>
                            <Typography>.</Typography>
                            <Typography
                              sx={{ display: "inline" }}
                              variant="body2"
                              color="text.secondary"
                              noWrap
                            >
                              {formatDistance(createdAt, new Date(), {
                                addSuffix: true,
                              })}
                            </Typography>
                          </Stack>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </ListItemButton>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </div>
    </div>
  );
};
export default UsersMsgs;
