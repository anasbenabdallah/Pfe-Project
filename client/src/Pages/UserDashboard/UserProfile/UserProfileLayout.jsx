//;
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import ProfilePageContent from "./ContentSide/ProfilePageContent";
import Banner from "./TopSide/TopBanner";

const UserProfileLayout = () => {
  return (
    <div>
      <Box>
        <Grid container>
          <Grid item lg={12} md={12} xs={12}>
            <Banner />
          </Grid>
          <Grid item lg={12} md={12} xs={12} mt={2}>
            <ProfilePageContent />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default UserProfileLayout;
