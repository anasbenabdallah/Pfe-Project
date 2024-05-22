import { Grid } from "@mui/material";
//;
import BrowseContentPage from "./Content/BrowseContentPage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: "1rem 10rem",
    [theme.breakpoints.down("md")]: {
      margin: "1rem 1rem",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 1rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 1rem",
    },
  },
}));
const BrowseLayout = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} mt={2} className={classes.gridItem}>
        <BrowseContentPage />
      </Grid>
    </Grid>
  );
};

export default BrowseLayout;
