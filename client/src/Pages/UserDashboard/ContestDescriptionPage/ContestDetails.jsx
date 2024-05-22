//;
import { Grid } from "@mui/material";
import LeftSide from "./leftSide/LeftSide";
import styled from "styled-components";
import { Box } from "@mui/system";
import Banner from "./TopSide/Banner";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import CardContext from "./CardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 8%",
    [theme.breakpoints.down("md")]: {
      padding: "2% 4%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2% 2%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "2% 0%",
    },
  },
}));

const ContestDetails = () => {
  const classes = useStyles();
  const location = useLocation();
  console.log(location); // check the value of location
  const card = location.state?.card;
  console.log(card); // check the value of card

  return (
    <CardContext.Provider value={{ card }}>
      <div>
        <Box>
          <Grid item xs={12}>
            <Banner entry={card} />
          </Grid>
          <Grid
            container
            columns={{ xs: 2, md: 12 }}
            columnSpacing={4}
            className={classes.root}
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <LeftSide />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </CardContext.Provider>
  );
};

export default ContestDetails;
