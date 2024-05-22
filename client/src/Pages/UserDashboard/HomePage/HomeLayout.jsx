import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";

// ==============================|| IMPORTED COMPONENTS ||============================== //
import Content from "./Content/Content";
import AddSocialPostCard from "../../../Components/shared/CreatePost/AddSocialPostCard";
import RightSideContent from "./rightSide/RightSideContent";
import LeftSideContent from "./userCard/LeftSideContent";
import { userEditProfile } from "../../../redux/actions/userProfileAction";
import { companyEditProfile } from "../../../redux/actions/companyProfileAction";
import { useNavigate } from "react-router-dom";
// ==============================|| HOMELAYOUT STYLING ||============================== //

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 2%",
    [theme.breakpoints.down("lg")]: {
      padding: "20px 2%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0%",
    },
  },
  gridItem: {
    padding: "0px 50px",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 20px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "0px",
      padding: "0px 30px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
      padding: "0px 0px",
    },
  },
}));

// ==============================|| HOMELAYOUT CODE ||============================== //

const HomeLayout = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myData = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") && myData.role === "user") {
      const data = dispatch(userEditProfile({}, myData));
      localStorage.setItem("user", JSON.stringify(data));
    } else if (query.get("success") && myData.role === "tester") {
      const data = dispatch(companyEditProfile({}, myData));
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, []);

  return (
    <div>
      <Box className={classes.root}>
        <Grid container columns={{ xs: 2, md: 12 }} rowSpacing={2} mt={1}>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Grid
              item
              lg={12}
              sx={{
                position: "sticky",
                top: 100,
              }}
            >
              <LeftSideContent />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12} className={classes.gridItem}>
            <Grid item lg={12}>
              <Stack spacing={2}>
                <AddSocialPostCard />
                <Content />
              </Stack>
            </Grid>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <Grid
              item
              lg={12}
              sx={{
                position: "sticky",
                top: 100,
                display: { xs: "none ", lg: "block", md: "block" },
              }}
            >
              <RightSideContent />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeLayout;
