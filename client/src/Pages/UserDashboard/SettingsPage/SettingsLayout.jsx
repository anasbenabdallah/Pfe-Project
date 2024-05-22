//;
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import GeneralInformations from "./AccountSettings/GeneralInformations";
import Privacy from "./AccountSettings/Privacy";
import VerticalSettingsTab from "./AccountSettings/SettingTabs/VerticalSettingsTab";
import HorizantalSettingsTab from "./AccountSettings/SettingTabs/HorizantalSettingsTab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 5%",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 5%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px 2%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px 2%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0%",
    },
  },
  gridItem: {
    padding: "0px 6rem",
    paddingTop: "2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 3rem",
      paddingTop: "2rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px 3rem",
      paddingTop: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0rem",
      paddingTop: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0rem",
      paddingTop: "2rem",
    },
  },
  VerticalTabItem: {
    padding: "0px 2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0px 2rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0rem",
    },
  },
}));

const SettingsLayout = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  function changeValue(e, params) {
    setValue(params);
  }
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid
          item
          lg={3}
          xs={3}
          sx={{ display: { lg: "block", md: "bloc", sm: "block", xs: "none" } }}
        >
          <VerticalSettingsTab changeValue={changeValue} value={value} />
        </Grid>

        <Grid
          item
          lg={9}
          xs={9}
          className={classes.VerticalTabItem}
          mt={2}
          sx={{ display: { lg: "none", md: "none", sm: "none", xs: "block" } }}
        >
          <HorizantalSettingsTab changeValue={changeValue} value={value} />
        </Grid>
        {value === 0 && (
          <Grid item lg={9} md={9} sm={9} xs={12} className={classes.gridItem}>
            <GeneralInformations />
          </Grid>
        )}
        {value === 1 && (
          <Grid item lg={9} md={9} sm={9} xs={12} className={classes.gridItem}>
            <Privacy />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SettingsLayout;
