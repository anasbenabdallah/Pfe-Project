import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
//;
import { NavigationTab } from "./Components/NavigationTab";

import MTable from "./Components/ParticipantsTableSection/ParticipantsTable";
import TesterCard from "./Components/section1/Client";
import TasksDescription from "./Components/section1/TaskDescription";
import ChooseWinner from "./Components/Winner/winner";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 0px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px",
    },
  },
  gridItem: {
    paddingRight: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
      paddingRight: "0px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      padding: "0px",
      paddingRight: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
}));
const LeftSide = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  function changeValue(e, params) {
    setValue(params);
  }

  return (
    <div>
      <Stack spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <NavigationTab changeValue={changeValue} value={value} />
        </Grid>
        {value === 0 && (
          <Grid container rowSpacing={2}>
            <Grid
              item
              lg={8}
              md={8}
              sm={12}
              xs={12}
              className={classes.gridItem}
            >
              <TasksDescription />
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{ display: { xs: "none", md: "block", lg: "block" } }}
            >
              <TesterCard />
            </Grid>
          </Grid>
        )}
        {value === 1 && (
          <Grid item lg={12} md={12} justify="center">
            <MTable />
          </Grid>
        )}

        {value === 2 && (
          <Grid item lg={12} md={12} justify="center">
            <ChooseWinner />
          </Grid>
        )}
      </Stack>
    </div>
  );
};

export default LeftSide;
