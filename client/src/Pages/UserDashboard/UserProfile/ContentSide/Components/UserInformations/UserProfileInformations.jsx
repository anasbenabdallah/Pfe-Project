import { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import { SocialMediaSection } from "./CardSections/SocialMediaSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../../../../../redux/actions/UserAction";
const UserProfileInformations = () => {
  const dispatch = useDispatch();
  const id = useParams().userId;
  const userProfile = useSelector((state) => state.User.userProfile);
  console.log("profileInfo", userProfile);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h5">ABOUT ME</Typography>
              <Typography variant="body">{userProfile.AboutMe}</Typography>
            </Stack>
            <SocialMediaSection />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileInformations;
