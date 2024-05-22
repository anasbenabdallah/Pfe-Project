import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFriends } from "../../../../../../redux/actions/UserAction";
import { useParams } from "react-router-dom";

const FollowersNumbers = () => {
  const dispatch = useDispatch();
  const id = useParams().userId;

  const Followers = useSelector((state) => state.User.friends);
  console.log("FollowersNumber", Followers);

  useEffect(() => {
    dispatch(getUserFriends(id)).catch(() =>
      console.log("Error loading posts")
    );
  }, [dispatch, id]);

  return (
    <div>
      <Stack flexDirection={"row"} columnGap={1} alignItems={"flex-end"}>
        <Typography variant="h5">{Followers.length}</Typography>
        <Typography variant="h6" color={"gray"}>
          Followers
        </Typography>
      </Stack>
    </div>
  );
};

export default FollowersNumbers;
