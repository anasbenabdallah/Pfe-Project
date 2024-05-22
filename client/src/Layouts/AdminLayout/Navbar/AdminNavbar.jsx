import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useNavigate } from "react-router-dom";

//import zustand
import { useAppStore } from "../../../appStore";
import { Stack } from "@mui/system";
import { Avatar, Button } from "@mui/material";
import AdminMenuList from "./components/AdminMenuList";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  color: "black",
}));

const AdminNavbar = () => {
  const user = localStorage.getItem("user");
  console.log("user:", user);
  const myData = JSON.parse(user);
  const userId = myData._id;
  //open and close the drawer
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const navigate = useNavigate();

  //function to handle button click and route to homepage
  const handleHomePageClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              ADMIN DASHBOARD
            </Typography>
          </Stack>
          <Stack flexDirection={"row"}>
            <IconButton
              variant="contained"
              size="large"
              edge="end"
              aria-label="homepage"
              onClick={handleHomePageClick}
            >
              <ChangeCircleIcon fontSize="large" color="primary" />
            </IconButton>
            <Stack flexDirection={"row"} alignItems={"center"} columnGap={2}>
              <AdminMenuList />
              <Avatar src={myData.picturePath} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNavbar;
