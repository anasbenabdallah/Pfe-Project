//;
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import FollowersHighlights from "./components/FollowersHighlights";
import FollowingsHighlights from "./components/FollowingsHighlights";
import CompletedChallenges from "./components/CompletedChallenges";

const UserHighlights = () => {
  return (
    <div>
      <Stack>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                >
                  <Typography variant="h5">USER HIGHLIGHTS</Typography>
                </Stack>
                <Divider />
              </Stack>
              <Stack spacing={2}>
                <FollowersHighlights />
                <FollowingsHighlights />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};

export default UserHighlights;
