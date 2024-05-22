//;
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// ==============================|| IMPORTED COMPONENTS ||============================== //

import LevelLoading from "./LevelLoading";
import { selectRole } from "../../../../../redux/reducers/AuthReducer";
import { useSelector } from "react-redux";
// ==============================|| STYLING ||============================== //

const useStyles = makeStyles((theme) => ({
  CardContent: {
    padding: "20px 10px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 0px",
    },
  },
  avatarPicture: {
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.primary.light}`,
  },
  dividerColor: {
    border: `1px solid ${theme.palette.secondary}`,
  },
  stack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

// ==============================|| USERCARD CODE ||============================== //
const UserCard = () => {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);
  return (
    <Box>
      <Card variant="outlined">
        <Box className={classes.CardContent}>
          <Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt="Remy Sharp"
                src={myData.picturePath}
                className={classes.avatarPicture}
              />
              <Stack
                spacing={1}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                {myData.role === "user" || myData.role === "admin" ? (
                  <Typography variant="h4">
                    {myData.firstname + " " + myData.lastname}
                  </Typography>
                ) : (
                  <Typography variant="h4">{myData.companyName}</Typography>
                )}
                <LevelLoading />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default UserCard;
