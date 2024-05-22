import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFriends } from "../../../../../../redux/actions/UserAction";

const FollowersHighlights = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const StoreduserId = user._id;
  const dispatch = useDispatch();

  const Followers = useSelector((state) => state.User.friends);
  console.log("FollowersNumber", Followers);

  useEffect(() => {
    dispatch(getUserFriends(StoreduserId)).catch(() =>
      console.log("Error loading posts")
    );
  }, [dispatch, StoreduserId]);

  return (
    <div>
      <Stack
        flexDirection={"row"}
        columnGap={1}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color={"gray"}>
          Followers
        </Typography>
        <Typography variant="h5">{Followers.length}</Typography>
      </Stack>
    </div>
  );
};

export default FollowersHighlights;
