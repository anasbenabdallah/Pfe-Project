import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowings } from "../../../../../../redux/actions/UserAction";
import { useParams } from "react-router-dom";

const FollowingsHighlights = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const StoreduserId = user._id;
  const dispatch = useDispatch();

  const FollowingsHighlights = useSelector((state) => state.User.followings);

  console.log("FollowingsHighlights", FollowingsHighlights);

  useEffect(() => {
    dispatch(getUserFollowings(StoreduserId)).catch(() =>
      console.log("Error loading followings")
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
          Followings
        </Typography>
        <Typography variant="h5">{FollowingsHighlights.length}</Typography>
      </Stack>
    </div>
  );
};

export default FollowingsHighlights;
