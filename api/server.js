const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB"); //connect to the database
const createAdminUser = require("./config/adminUser"); //create the admin user
const { sendNotificationEmail } = require("./middlewares/mail.middleware");
const User = require("./models/user.model");

app.use(
  session({
    secret: "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", // set your secret key
    resave: false,
    saveUninitialized: false,
  })
);
///login with google
const passportSetup = require("./config/passport");
const passport = require("passport");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connectDB();

app.use(passport.initialize());
//app routes
const indexRouter = require("./routes/index.router"); //the routes of all the project
app.use("/", indexRouter);

const PORT = process.env.PORT || 5000;

createAdminUser();

// async function addYearsRegisteredToUsers() {
//   const users = await User.find({});
//   for (const user of users) {
//     user.yearsRegistered = user.yearsRegistered || 0;
//     console.log(user.yearsRegistered);
//     await user.save();
//   }
//   console.log("Years registered added to all users.");
//   process.exit();
// }

// addYearsRegisteredToUsers();

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (client) => {
  console.log("socket is connected");
});
server.listen(PORT, (error) => {
  if (error) throw console.error(error);
  console.log("Server is listening on port" + " " + PORT);
});
