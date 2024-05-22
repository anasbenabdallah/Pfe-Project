import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Grid,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcons from "./components/MenuIcons/MenuIcons";
import { Link } from "react-router-dom";
import NavbarTab from "./components/NavbarNavigation/NavbarTab";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import NavbarSearchDropDown from "./components/NavbarSearch/NavbarSearchDropDown";

const CustomNavbar = () => {
  const theme = useTheme(); // Access the theme
  console.log(theme.palette.primary.main); // Log the primary color to check what it is

  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("WyPlay");

  const navigate = useNavigate();

  useEffect(() => {
    if (!myData) {
      setIsAuthenticated(true);
      navigate("/login");
    }
  }, []);

  if (!myData) {
    return null;
  }

  return (
    <Grid container>
      <AppBar
        position="fixed"
        variant="elevation"
        elevation={0}
        sx={{ bgcolor: "#1a1a1a" }}
      >
        <Toolbar
          sx={{
            padding: "0px!important",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Grid item xs={10} sm={8} md={3} p={"0 0 0 24px"}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={"1rem"}>
              <Typography
                variant="h4"
                sx={{
                  display: { xs: "none", lg: "block" },
                  color: "white", // Text color
                  textDecoration: "none",
                }}
                component={Link}
                to="/"
              >
                {title}
              </Typography>
              <NavbarSearchDropDown />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <NavbarTab />
          </Grid>
          <Grid item xs={2} sx={{ display: { xs: "flex", sm: "none" } }}>
            <Box>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                sx={{ color: theme.palette.primary.main }} // Apply the primary main color for icons
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            sm={3}
            sx={{
              display: { sm: "flex", xs: "none" },
            }}
            justifyContent={"flex-end"}
            p={"0px 24px"}
          >
            <MenuIcons color={theme.palette.primary.main} />
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Grid>
  );
};

export default CustomNavbar;
