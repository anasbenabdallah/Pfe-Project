import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Divider,
  DialogTitle,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { addChallenge } from "../../../../../../../redux/actions/ChallengeAction";
import ChallengeForm from "../../../../../../../Pages/UserDashboard/BrowsePage/Content/ContestCards/ChallengesForm";

export const AddChallengeModal = ({ open, handleClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  const [openn, setOpenn] = useState(false); // dialog state

  const companyId = JSON.parse(localStorage.getItem("user"))._id;
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission behavior
    const data = await dispatch(
      addChallenge({ companyId, title, description, category, price })
    );

    handleClose(); // close the dialog after form submission
  };

  const handleCloseDialog = () => {
    setOpenn(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack component="form" onSubmit={handleSubmit} spacing={1}>
        <DialogTitle variant="h5">Create a Challenge</DialogTitle>
        <Divider />
        <DialogContent>
          <ChallengeForm onClose={handleCloseDialog} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
};
