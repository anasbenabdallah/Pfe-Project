import { useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { getUserFriends } from "../../../../../../redux/actions/UserAction";
import { Link, useNavigate, useParams } from "react-router-dom";

const Followers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const id = useParams().userId;

  const Followers = useSelector((state) => state.User.friends);
  console.log("friends", Followers);

  useEffect(() => {
    dispatch(getUserFriends(id)).catch(() =>
      console.log("Error loading posts")
    );
  }, [dispatch, id]);

  return (
    <div>
      <Grid container columnSpacing={2}>
        {Followers.map(
          (friend) =>
            friend && (
              <Grid item lg={3} md={6} xs={12}>
                <Link
                  to={`/profile/${friend._id}`}
                  key={friend._id}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      border: "1px solid rgba(58, 53, 65, 0.12)",
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Avatar
                          alt="yourphoto"
                          src={friend.picturePath}
                          sx={{
                            width: 113,
                            height: 113,
                            /*mt: "-4.5rem",*/
                            border: "3px solid white",
                          }}
                        />
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Stack flexDirection={"row"} gap={"0.3rem"}>
                            <Typography variant="h5">
                              {friend.firstname}
                            </Typography>
                            <Typography variant="h5">
                              {friend.lastname}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
};

export default Followers;
