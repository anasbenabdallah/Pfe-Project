//;
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchContent from "./ContentSide/SearchContent";

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

const SearchResultPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        columns={{ xs: 2, md: 12 }}
        mt={2}
        className={classes.root}
      >
        <Grid item xs={12}>
          <SearchContent />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResultPage;
