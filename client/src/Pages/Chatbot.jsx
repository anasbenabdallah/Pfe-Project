import { useState } from "react";
import {
  IconButton,
  TextField,
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import RobotIcon from "@mui/icons-material/Android";
import { styled } from "@mui/material/styles";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const ChatContainer = styled("div")(({ theme, open }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  width: 300,
  backgroundColor: "#fff",
  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  borderRadius: "15px 15px 0 0",
  transform: open ? "translateY(0)" : "translateY(100%)",
  transition: "transform 0.3s ease-in-out",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
  border: "1px solid black",
}));

const MessagesContainer = styled("div")({
  padding: "10px",
  overflowY: "auto",
  maxHeight: "300px",
});

const InputContainer = styled("div")({
  borderTop: "1px solid #ccc",
  padding: "10px",
});

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChatToggle = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: `Hello , welcome to WyPlay chatbot! I'm here to answer your questions.`,
            sender: "bot",
          },
        ]);
      }, 500);
    }
  };

  const handleMessageSend = async () => {
    if (inputValue) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      const response = await fetch("http://localhost:8000/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here",
        },
        body: JSON.stringify({ userInput: inputValue }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((msgs) => [
          ...msgs,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            text: "Sorry, there was a problem processing your request.",
            sender: "bot",
          },
        ]);
      }
      setInputValue(""); // Ensure the inputValue is cleared here
    }
  };

  return (
    <div>
      <IconButton
        onClick={handleChatToggle}
        color="primary"
        aria-label="chat"
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1500 }}
      >
        <ChatIcon />
      </IconButton>

      <ChatContainer open={open}>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "purple" }}>
            <RobotIcon />
          </Avatar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Chat
          </Typography>
        </div>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              {msg.sender === "bot" ? (
                <ListItemAvatar>
                  <SmartToyIcon>
                    <RobotIcon />
                  </SmartToyIcon>
                </ListItemAvatar>
              ) : null}
              <ListItemText
                primary={
                  <Typography
                    color={msg.sender === "bot" ? "textPrimary" : "primary"}
                    style={{
                      display: "inline-block",
                      maxWidth: "calc(100% - 56px)",
                    }} // This calculation prevents text overlap with the avatar
                  >
                    {msg.text}
                  </Typography>
                }
                style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
              />
            </ListItem>
          ))}
        </MessagesContainer>
        <InputContainer>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Type your message"
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleMessageSend()}
          />
          <Button onClick={handleMessageSend} color="primary">
            Send
          </Button>
        </InputContainer>
      </ChatContainer>
    </div>
  );
};

export default Chatbot;
