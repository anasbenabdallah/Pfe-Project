import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Stack } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate, useParams } from "react-router-dom";

// ==============================|| REDUX ||============================== //
import { useDispatch } from "react-redux";
import { logout } from "../../../../../../redux/actions/AuthAction";

// ==============================|| STYLING ||============================== //

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 32,
    height: 32,
  },
  menu: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    width: "100%",
    minWidth: 260,
    maxWidth: 300,
    mt: 1.5,
    borderRadius: "10px",
    "& .MuiAvatar-root": {
      width: 50,
      height: 50,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
  name: {
    fontSize: 14,
  },
  title: {
    color: theme.palette.text.secondary,
  },
}));

// ==============================|| CODE ||============================== //

const ProfileMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  console.log("user:", user);

  const myData = JSON.parse(user);
  const userId = myData._id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              className={classes.avatar}
              src={myData.picturePath}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 320,
            maxWidth: 380,
            "& .MuiAvatar-root": {
              width: 45,
              height: 45,
              mr: 1.5,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          component={Link}
          to={`/profile/${userId}`}
          sx={{ display: "flex", alignItems: "center", columnGap: "0.6rem" }}
        >
          <Avatar src={myData.picturePath} />
          <Stack>
            {myData.role === "user" || myData.role === "admin" ? (
              <div>
                <Typography variant="h5">
                  {myData.firstname + " " + myData.lastname}
                </Typography>
                <Typography variant="body1" color={"text.secondary"}>
                  {myData.fieldOfStudy}
                </Typography>
              </div>
            ) : (
              <Typography variant="h5">{myData.companyName}</Typography>
            )}
          </Stack>
        </MenuItem>
        <Divider />
        {myData.role === "admin" ? (
          <MenuItem component={Link} to="/adminDashboard">
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin Dashboard
          </MenuItem>
        ) : null}
        <MenuItem component={Link} to="/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={Link} to="/login" onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProfileMenu;
