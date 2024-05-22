import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./util";
import JobPopup from "./JobPopup";
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
const Salary = styled.div`
  color: green;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  align-items: center;
`;

const MoneyIcon = styled(FaMoneyBill)`
  margin-right: 5px;
`;

const Job = ({
  title,
  description,
  imageURL,
  salary,
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
    navigate(`/browse/MyJobs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/job/${id}`)
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
              alt="Job Image"
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Salary>
                    <MoneyIcon />
                    {salary}$ Per Month
                  </Salary>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    {description}
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
              alt="Job Image"
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Salary>
                    <MoneyIcon />
                    {salary}$ Per month
                  </Salary>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    {description}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      )}

      {myData.role === "user" && (
        <JobPopup
          open={open}
          handleClose={handleClose}
          title={title}
          description={description}
          jobId={id}
          userId={userId} // pass down userId prop
        />
      )}
      {myData.role === "tester" && (
        <Participants jobId={id} open={open} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Job;
