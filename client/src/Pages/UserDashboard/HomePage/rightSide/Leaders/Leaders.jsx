import { useEffect, useMemo, useState } from "react";

import {
  Typography,
  Stack,
  Box,
  Card,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import RankLink from "@mui/material/Link";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../../../redux/actions/UserAction";
import { followUser } from "../../../../../redux/actions/UserAction";

const CustomizedCard = styled(Card)((theme) => ({
  padding: 15,
  borderRadius: "0.5rem",
}));

const BoxContentUser = styled(Box)((theme) => ({
  flexDirection: "row",
  display: "flex",
  columnGap: "0.5rem",
  alignItems: "center",
}));

const useStyles = makeStyles((theme) => ({
  Avatar: {
    width: 45,
    height: 45,
    border: `2px solid ${theme.palette.primary.light}`,
  },
}));

const Leaders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser._id;

  const leaders = useSelector((state) => {
    return state.User.users.filter((user) => user._id !== loggedInUserId);
  });

  useEffect(() => {
    dispatch(getAllUsers()).catch(() => console.log("Error loading posts"));
  }, []);

  return (
    <div>
      <CustomizedCard elevation={0} variant="outlined">
        <Stack spacing={2}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">Wyplay best contributers</Typography>
            <RankLink
              underline="hover"
              variant="body2"
              color={"text.secondary"}
              component={Link}
              to="/leaderboard"
            >
              view all
            </RankLink>
          </Stack>
          <Divider />

          {leaders.slice(0, 3).map((leader) => (
            <Box
              key={leader._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <BoxContentUser>
                <Avatar className={classes.Avatar} src={leader.picturePath} />
                <Stack>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {leader.firstname}
                  </Typography>
                  <Box display={"flex"} flexDirection={"row"} gap={"0.3rem"}>
                    <Typography color="text.secondary" variant="subtitle2">
                      {leader.country}
                    </Typography>
                  </Box>
                </Stack>
              </BoxContentUser>
              <Typography>{leader.score} XP</Typography>
            </Box>
          ))}
        </Stack>
      </CustomizedCard>
    </div>
  );
};
export default Leaders;
