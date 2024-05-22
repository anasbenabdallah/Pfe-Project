import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowings } from "../../../../../../redux/actions/UserAction";
import { useParams } from "react-router-dom";

const FollowingsNumbers = () => {
  const dispatch = useDispatch();
  const id = useParams().userId;

  const Followings = useSelector((state) => state.User.followings);

  useEffect(() => {
    dispatch(getUserFollowings(id)).catch(() =>
      console.log("Error loading followings")
    );
  }, [dispatch, id]);
  return (
    <div>
      <Stack flexDirection={"row"} columnGap={1} alignItems={"flex-end"}>
        <Typography variant="h5">{Followings.length}</Typography>
        <Typography variant="h6" color={"gray"}>
          Followings
        </Typography>
      </Stack>
    </div>
  );
};

export default FollowingsNumbers;
