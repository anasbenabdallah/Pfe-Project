//;
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteChallenge } from "../../../../../../redux/actions/ChallengeAction";

const CardOptions = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleDelete = () => {
    handleClose();
    const data = dispatch(deleteChallenge(id));
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          transform: "translate(-8px, 8px)",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          Delete Challenge
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardOptions;
