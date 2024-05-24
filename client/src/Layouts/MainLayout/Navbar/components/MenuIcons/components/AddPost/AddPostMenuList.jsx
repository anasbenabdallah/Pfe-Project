import { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { AddWorkOfferModal } from "./AddWorkOfferModal";
import { AddChallengeModal } from "./AddChallengeModal";

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

const AddPostMenuList = () => {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ==============================|| ADD WORK OFFER CODE ||============================== //
  const [openWorkModal, setOpenWorkModal] = useState(false);

  const handleClickOpenModalWork = () => {
    setOpenWorkModal(true);
  };

  const handleCloseModalWork = () => {
    setOpenWorkModal(false);
  };
  // ==============================|| ADD A CHALLENGE CODE ||============================== //
  const [openChallengeModal, setOpenChallengeModal] = useState(false);

  const handleClickOpenModalChallenge = () => {
    setOpenChallengeModal(true);
  };

  const handleCloseModalChallenge = () => {
    setOpenChallengeModal(false);
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
            <AddIcon style={{ color: "orange" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          className: classes.menu,
        }}
        sx={{ mt: 1 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {myData.role === "tester" && (
          <MenuItem onClick={handleClickOpenModalWork}>
            <ListItemIcon>
              <WorkIcon fontSize="small" />
            </ListItemIcon>
            Add work offer
          </MenuItem>
        )}
        {myData.role === "tester" && (
          <MenuItem onClick={handleClickOpenModalChallenge}>
            <ListItemIcon>
              <LocalFireDepartmentIcon fontSize="small" />
            </ListItemIcon>
            Add a challenge
          </MenuItem>
        )}
      </Menu>

      <AddWorkOfferModal
        open={openWorkModal}
        handleClose={handleCloseModalWork}
      />
      <AddChallengeModal
        open={openChallengeModal}
        handleClose={handleCloseModalChallenge}
      />
    </React.Fragment>
  );
};

export default AddPostMenuList;
