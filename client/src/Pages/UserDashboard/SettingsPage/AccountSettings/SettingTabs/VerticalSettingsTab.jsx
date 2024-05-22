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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

const VerticalSettingsTab = ({ changeValue, value }) => {
  return (
    <Box>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={changeValue}
        variant="scrollable"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          height: "91vh",
          paddingTop: "2rem",
        }}
      >
        <Tab label="General Informations" />
        <Tab label="Privacy" />
      </Tabs>
    </Box>
  );
};

export default VerticalSettingsTab;
