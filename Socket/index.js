const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log("Added user:", { userId, socketId });
  console.log("Users array:", users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  console.log("getUser called with userId:", userId);
  console.log("getUser found user:", user);
  return user;
};

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("addUser", (userId) => {
    socket.join(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", (data) => {
    console.log(`sendMessage called with data: ${JSON.stringify(data)}`);
    const user = getUser(data.receiverId);
    if (user) {
      console.log(`Sending message to user ${user.userId}`);
      io.to(user.socketId).emit("getMessage", data); // Correct way to send to specific user
    } else {
      console.log("User not found");
    }
  });
});
