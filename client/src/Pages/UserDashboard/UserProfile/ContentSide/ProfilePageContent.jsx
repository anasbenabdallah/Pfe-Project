//;
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { ProfileNavigationTab } from "./Components/ProfileNavigationTab";
import UserProfileInformations from "./Components/UserInformations/UserProfileInformations";
import Followers from "./Components/Followers/Followers";
import MyEvents from "./Components/MyEvents/MyEvents";
import AddSocialPostCard from "../../../../Components/shared/CreatePost/AddSocialPostCard";
import MySocialPosts from "./Components/MyPosts/MySocialPosts ";
import MyChallenges from "./Components/MyChallenges/MyChallenges";
import Followings from "./Components/Followings/Followings";
import FeedbacksPage from "./Components/FeedBacks/feedbacks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 10%",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "10px",
    },
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
      paddingRight: "0px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "0px",
      paddingRight: "10px",
    },
  },
}));

const ProfilePageContent = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  function changeValue(e, params) {
    setValue(params);
  }
  return (
    <div>
      <Stack spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <ProfileNavigationTab changeValue={changeValue} value={value} />
        </Grid>
        {/* ***** main page ***** */}
        {value === 0 && (
          <Grid container>
            <Grid
              item
              lg={5}
              md={5}
              xs={12}
              pr={4}
              className={classes.gridItem}
            >
              <UserProfileInformations />
            </Grid>
            <Grid item lg={7} md={7} xs={12} className={classes.gridItem}>
              <Stack spacing={2}>
                <AddSocialPostCard />
                <MySocialPosts />
              </Stack>
            </Grid>
          </Grid>
        )}

        {value === 1 && (
          <Grid item lg={12} md={12} xs={12} justify="center">
            <Followers />
          </Grid>
        )}
        {value === 2 && (
          <Grid item lg={12} md={12} xs={12} justify="center">
            <Followings />
          </Grid>
        )}

        {value === 3 && (
          <Grid item lg={12} md={12} xs={12} justify="center">
            <FeedbacksPage />
          </Grid>
        )}
      </Stack>
    </div>
  );
};

export default ProfilePageContent;
