import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { Button, Fab } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followUser, getUserById } from "../../../../redux/actions/UserAction";
import HighlightSection from "./HighlightSection/HighlightSection";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.background.paper}`,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
  cardContent: {
    margin: "40px 10%",
  },
}));

const ProfileInformations = () => {
  const classes = useStyles();
  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();
  const id = useParams().userId;
  const userProfile = useSelector((state) => state.User.userProfile);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const StoreduserId = user._id;
  console.log(StoreduserId); // add this line

  const handleFollow = () => {
    const followStatus = isFollowed ? "unfollow" : "follow";
    dispatch(followUser(id, followStatus)).then((response) => {
      setIsFollowed(!isFollowed);
    });
  };

  useEffect(() => {
    if (userProfile.followers && userProfile.followers.includes(StoreduserId)) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }, [userProfile.followers, StoreduserId]);

  return (
    <div>
      <Card elevation={0} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Stack spacing={2}>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack flexDirection={"row"} alignItems={"center"} columnGap={3}>
                <Avatar
                  alt="Profile picture"
                  src={userProfile.picturePath}
                  className={classes.avatar}
                />
                <Stack spacing={2}>
                  {userProfile.role === "user" ||
                  userProfile.role === "admin" ? (
                    <div>
                      <Typography variant="h4" gutterBottom>
                        {userProfile.firstname + " " + userProfile.lastname}
                      </Typography>
                      <Stack spacing={2}>
                        <HighlightSection />
                      </Stack>
                    </div>
                  ) : (
                    <Typography variant="h4">
                      {userProfile.companyName}
                    </Typography>
                  )}
                </Stack>
              </Stack>
              {id === StoreduserId ? (
                <Button
                  size="medium"
                  variant="contained"
                  component={Link}
                  to={`/settings`}
                  sx={{ height: "2rem" }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  size="medium"
                  variant="contained"
                  onClick={handleFollow}
                  sx={{ height: "2rem" }}
                >
                  {isFollowed ? "unfollow" : "Follow"}
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInformations;
