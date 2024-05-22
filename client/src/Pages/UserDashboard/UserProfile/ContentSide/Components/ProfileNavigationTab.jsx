//;
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export const ProfileNavigationTab = ({ changeValue, value }) => {
  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={changeValue}
          aria-label="basic tabs example"
        >
          <Tab label="My Posts" />
          <Tab label="My Challenges" />
          <Tab label="Followers" />
          <Tab label="Followings" />
          <Tab label="My Jobs" />
          <Tab label="FeedBacks" />
        </Tabs>
      </Box>
    </Box>
  );
};
