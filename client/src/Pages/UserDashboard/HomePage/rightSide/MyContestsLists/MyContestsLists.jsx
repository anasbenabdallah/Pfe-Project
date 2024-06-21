import { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Card,
  Avatar,
  Button,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import RankLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import {
  getUserChallenges,
  getTesterChallenges,
} from "../../../../../redux/actions/ChallengeAction";
import {
  selectUserChallenges,
  selectTesterChallenges,
} from "../../../../../redux/reducers/ChallengeReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import getTimeLeft from "./getTimeLeft";
import getDeadlineDifference from "../../../ContestDescriptionPage/TopSide/deadlineModif";

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

const MyContestLists = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [myChallenges, setMyChallenges] = useState([]);

  const user = localStorage.getItem("user");

  const myData = JSON.parse(user);

  useEffect(() => {
    if (myData.role === "tester") {
      dispatch(getTesterChallenges(myData._id));
    } else {
      dispatch(getUserChallenges(myData._id));
    }
  }, [dispatch, myData._id, myData.role]);

  const challenges = useSelector(selectUserChallenges);
  console.log("challenges:", challenges);
  const testerChallenges = useSelector(selectTesterChallenges);

  const updatedChallenges =
    myData.role === "tester" ? testerChallenges : challenges;

  useEffect(() => {
    setMyChallenges(updatedChallenges);
  }, [updatedChallenges]);

  console.log(myChallenges);

  myChallenges
    .map((user) => ({
      ...user,
      isFollowed: false,
    }))
    .slice(0, 2);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };
  // filter out finished challenges
  const inProgressChallenges = myChallenges.filter((challenge) =>
    handleProgress(challenge)
  );

  return (
    <div>
      {inProgressChallenges.length > 0 && (
        <CustomizedCard elevation={0} variant="outlined">
          <Stack spacing={2}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h5">My Contests</Typography>
            </Stack>
            <Divider />
            {inProgressChallenges.slice(0, 2).map((user) => (
              <Box
                key={user._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <BoxContentUser>
                  <Avatar
                    className={classes.Avatar}
                    src={
                      user.testerId.picturePath
                        ? user.testerId.picturePath
                        : myData.picturePath
                    }
                  />
                  <Stack>
                    <Stack>
                      <Typography variant="h6" fontWeight={"bold"}>
                        {myData.role === "tester"
                          ? myData.testerName
                          : user?.testerId.testerName}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" noWrap color={"primary"}>
                      {getTimeLeft(user.deadline)}
                    </Typography>
                  </Stack>
                </BoxContentUser>
              </Box>
            ))}
          </Stack>
        </CustomizedCard>
      )}
    </div>
  );
};

export default MyContestLists;
