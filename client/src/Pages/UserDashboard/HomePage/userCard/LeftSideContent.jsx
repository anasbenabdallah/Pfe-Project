import { Stack } from "@mui/material";
//;
import UserCard from "./userCard/UserCard";
import UserHighlights from "./UserHighlights/UserHighlights";

const LeftSideContent = () => {
  return (
    <div>
      <Stack spacing={2}>
        <UserCard />
        <UserHighlights />
      </Stack>
    </div>
  );
};

export default LeftSideContent;
