//;
import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ContentSide from "./ContentSide/ContentSide";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 14%",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "20px 0%",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "20px 2%",
    },
  },
  gridItem: {
    paddingRight: "10px",
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
const LeaderBoardLayout = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container columns={{ xs: 2, md: 12 }} className={classes.root}>
        <Grid item xs={12}>
          <ContentSide />
        </Grid>
      </Grid>
    </Box>
  );
};
export default LeaderBoardLayout;
