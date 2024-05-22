import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Conversation from "./components/Conversation";
import UsersMsgs from "./components/UsersMsgs";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../../../redux/actions/ConversationAction";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const useStyles = makeStyles({
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
});

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state) => state.Conversation.conversations
  );

  const navigate = useNavigate();
  const { selectedConversationId } = useParams();

  // Get the selected conversation object from the conversations array
  const selectedConversation = conversations.find(
    (conversation) => conversation.conversationId === selectedConversationId
  );

  const user = JSON.parse(localStorage.getItem("user"));

  {
    /*const otherUser =
    selectedConversation &&
  selectedConversation.members.find((member) => member.id !== user._id);*/
  }

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  const [otherUser, setOtherUser] = useState({});

  const handleConversationSelection = (conversationId, otherUser) => {
    setOtherUser(otherUser);
    navigate(`/chat/${conversationId}`);
  };

  const socket = io.connect("localhost:8900");

  return (
    <div>
      <Grid container component={Paper}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Grid item xs={12}>
            <UsersMsgs onConversationSelect={handleConversationSelection} />
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Conversation
            conversationId={selectedConversationId}
            socket={socket}
            otherUser={otherUser}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
