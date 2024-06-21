import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

import { AddSocialPostModal } from "./AddSocialPostModal";

import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../../../src/redux/actions/UserAction";
import { getTesterById } from "../../../../src/redux/actions/testerProfileAction";
import { useLocation, useParams } from "react-router-dom";

export const CustomButton = styled(Button)(() => ({
  display: "flex",
  borderRadius: "10rem",
  borderColor: "#E7E7E8",
  color: "#979797",
  height: "3rem",
  justifyContent: "flex-start",
  padding: "6px 15px",
  width: "100%",
}));

const AddSocialPostCard = () => {
  const dispatch = useDispatch();
  const id = useParams().userId;
  const userProfile = useSelector((state) => state.User.userProfile);

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const StoreduserId = user._id;

  console.log("profileInfo", userProfile);

  useEffect(() => {
    if (!id) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(getUserById(user._id));
    } else {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);
  // ==============================|| ADD SOCIAL MEDIA POST CODE ||============================== //

  const [openPostModal, setOpenPostModal] = useState(false);

  const handleClickOpenModalPost = () => {
    setOpenPostModal(true);
  };

  const handleCloseModalPost = () => {
    setOpenPostModal(false);
  };

  // ==============================|| COMPANY ||============================== //

  return (
    <div>
      {(location.pathname === "/home" || id === StoreduserId) && (
        <Card variant="outlined" sx={{ borderRadius: "0.5rem" }}>
          <Stack
            direction={"row"}
            alignItems="center"
            gap={1}
            sx={{ p: "15px" }}
          >
            <Avatar
              alt="yourphoto"
              src={
                userProfile && userProfile.picturePath
                  ? userProfile.picturePath
                  : "https://example.com/default-avatar.jpg"
              }
              sx={{ width: 45, height: 45 }}
            />
            <CustomButton variant="outlined" onClick={handleClickOpenModalPost}>
              Create a post
            </CustomButton>
          </Stack>
          <AddSocialPostModal
            open={openPostModal}
            handleClose={handleCloseModalPost}
          />
        </Card>
      )}
    </div>
  );
};

export default AddSocialPostCard;
