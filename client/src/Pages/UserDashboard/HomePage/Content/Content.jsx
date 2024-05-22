//;
import { Stack } from "@mui/system";
import SocialPosts from "./SocialMediaPosts/SocialPosts ";
import ScrollableTabs from "./ScrollableTab/ScrollableTab";

const Content = () => {
  return (
    <div>
      <Stack spacing={2}>
        <ScrollableTabs />
        <SocialPosts />
      </Stack>
    </div>
  );
};

export default Content;
