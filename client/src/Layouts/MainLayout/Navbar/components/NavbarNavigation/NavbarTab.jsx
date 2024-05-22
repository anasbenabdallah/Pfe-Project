import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

const tabStyles = { p: 3 };

const NavbarTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: { xs: "none", md: "grid", alignItems: "center" },
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label="Home"
          component={Link}
          to="/home"
          sx={{
            ...tabStyles,
            color: "#9900cc", // Set the color of the tab text to red
          }}
          value={0}
        />

        <Tab
          label="Browse"
          component={Link}
          to="/browse"
          sx={{
            ...tabStyles,
            color: "#9900cc", // Set the color of the tab text to red
          }}
          value={2}
        />
        <Tab
          label="Leaderboard"
          component={Link}
          to="/leaderboard"
          sx={{
            ...tabStyles,
            color: "#9900cc", // Set the color of the tab text to red
          }}
          value={3}
        />
      </Tabs>
    </Box>
  );
};

export default NavbarTab;
