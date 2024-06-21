import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./util";
import EventPopup from "./EventPopup";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Participants from "./Appliers";
import styled from "styled-components";
import { FaMoneyBill } from "react-icons/fa";

const Event = ({
  title,
  description,
  imageURL,
  participants,
  userName,
  isUser,
  profilpic,
  id,
  userId,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    navigate(`/browse/MyEvents/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/event/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => window.location.reload());
  };

  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);

  return (
    <div style={{ display: "inline-block", width: "30%", margin: "10px" }}>
      {myData.role === "tester" && (
        <CardActionArea onClick={isUser ? handleClickOpen : () => {}}>
          <Card
            className={classes.card}
            elevation={1}
            sx={{
              width: "100%",
              padding: 2,
              boxShadow: "5px 5px 10px #ccc",
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
              bgcolor: "inherit", // Add this line to set gold background for current user's card
            }}
          >
            {isUser && (
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleEdit}>
                  <ModeEditOutlineIcon color="warning" />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </Box>
            )}
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  alt="Profile picture"
                  src={profilpic}
                />
              }
              title={userName}
            />
            <CardMedia
              component="img"
              height="194"
              image={imageURL}
              alt="Event Image"
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="subtitle1">{title}</Typography>

                  <Typography variant="body1" color="text.secondary" noWrap>
                    {description}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    Participants: {participants}{" "}
                    {/* Display participants here */}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      )}

      {myData.role === "user" && (
        <CardActionArea onClick={handleClickOpen}>
          <Card
            className={classes.card}
            elevation={1}
            sx={{
              width: "100%",
              padding: 2,
              boxShadow: "5px 5px 10px #ccc",
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
              bgcolor: "inherit", // Add this line to set gold background for current user's card
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  className={classes.avatar}
                  alt="Profile picture"
                  src={profilpic}
                />
              }
              title={userName}
            />
            <CardMedia
              component="img"
              height="194"
              image={imageURL}
              alt="Event Image"
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="subtitle1">{title}</Typography>

                  <Typography variant="body1" color="text.secondary" noWrap>
                    {description}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    Participants: {participants}{" "}
                    {/* Display participants here */}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      )}

      {myData.role === "user" && (
        <EventPopup
          open={open}
          handleClose={handleClose}
          title={title}
          description={description}
          eventId={id}
          userId={userId} // pass down userId prop
        />
      )}
      {myData.role === "tester" && (
        <Participants eventId={id} open={open} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Event;
