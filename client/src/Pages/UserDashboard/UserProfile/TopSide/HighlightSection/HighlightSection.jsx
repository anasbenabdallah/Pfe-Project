//;
import { Card, CardContent, Stack, Typography } from "@mui/material";
import FollowersNumbers from "./components/FollowersNumbers";
import FollowingsNumbers from "./components/FollowingsNumbers";
import CompletedChallenges from "./components/CompletedChallenges";

const HighlightSection = () => {
  return (
    <div>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Stack flexDirection={"row"} columnGap={1} alignItems={"flex-end"}>
          <FollowersNumbers />
          <FollowingsNumbers />
          <CompletedChallenges />
        </Stack>
      </Stack>
    </div>
  );
};

export default HighlightSection;
