import { Grid, Box } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import BrowseNavigationTab from "./BrowseNavigationTabs/BrowseNavigationTab";

import ContestCards from "./ContestCards/ContestCards";
import AllEvents from "./WorkCards/AllEvents";
import ContestsFilters from "./ContestCards/ContestFilters";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const BrowseContentPage = () => {
  const [value, setValue] = useState(0);
  const [innerValue, setInnerValue] = useState(0);

  function changeValue(e, params) {
    setValue(params);
  }

  return (
    <div>
      <Stack spacing={2}>
        <Grid item xs={12}>
          <BrowseNavigationTab changeValue={changeValue} value={value} />
        </Grid>
        {/* ***** main page ***** */}
        {value === 0 && (
          <Grid container>
            <Grid item lg={9} md={9} xs={8} pr={4}>
              <ContestCards />
            </Grid>
          </Grid>
        )}
        {value === 1 && (
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <AllEvents />
            </Grid>
          </Grid>
        )}
      </Stack>
    </div>
  );
};

export default BrowseContentPage;
