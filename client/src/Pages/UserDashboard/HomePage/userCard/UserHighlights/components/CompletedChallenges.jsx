import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getDeadlineDifference from "../../../../ContestDescriptionPage/TopSide/deadlineModif";
import { useSelector } from "react-redux";
import {
  selectTesterChallenges,
  selectUserChallenges,
} from "../../../../../../redux/reducers/ChallengeReducer";
import {
  getTesterChallenges,
  getUserChallenges,
} from "../../../../../../redux/actions/ChallengeAction";
import { useDispatch } from "react-redux";

const CompletedChallenges = () => {
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
  const testerChallenges = useSelector(selectTesterChallenges);

  const updatedChallenges =
    myData.role === "tester" ? testerChallenges : challenges;

  useEffect(() => {
    setMyChallenges(
      updatedChallenges.filter((challenge) => !handleProgress(challenge))
    );
  }, [updatedChallenges]);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  console.log("mychallngesyajhon", myChallenges);
  return (
    <div>
      <Stack
        flexDirection={"row"}
        columnGap={1}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5">{myChallenges.length}</Typography>
      </Stack>
    </div>
  );
};

export default CompletedChallenges;
