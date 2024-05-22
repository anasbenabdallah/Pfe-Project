//;
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

const UserHighlights = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack>
          <Stack spacing={1}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Typography variant="body1" fontWeight={"bold"}>
                COMPLETED CHALLENGES
              </Typography>
              <Typography variant="h5" color={"primary"}>
                04
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserHighlights;
