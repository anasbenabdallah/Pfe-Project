//;
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CardHeader from "@mui/material/CardHeader";
import { Stack, Card, CardContent, Divider, Chip } from "@mui/material";
import { useContext } from "react";
import CardContext from "../../../CardContext";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserSubmitChallenge } from "../../../../../../redux/actions/ChallengeAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParticipantsDialog = ({ open, handleClose, userId, user }) => {
  const [data, setData] = React.useState(null);
  const { card } = useContext(CardContext);
  console.log(card);
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId);
        const result = await dispatch(getUserSubmitChallenge(id, userId));
        console.log(result);
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              PARTICIPANT SUBMISSION
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          {data && data.length > 0 && (
            <Card>
              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    User :{" "}
                    <Link to={`/profile/${user._id}`}>
                      {user.firstname + user.lastname}
                    </Link>
                  </Typography>
                }
              />
              <Divider />

              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    Title
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body1">{data[0].title}</Typography>
                </Stack>
              </CardContent>
              <CardHeader
                title={
                  <Typography component="div" variant="h4">
                    Description
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body1">{data[0].description}</Typography>
                </Stack>
              </CardContent>
              {data[0].filesPaths && data[0].filesPaths.length > 0 && (
                <>
                  <Divider />
                  <CardHeader
                    title={
                      <Typography component="div" variant="h4">
                        Files Attached
                      </Typography>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={2}>
                      {data[0].filesPaths.map((file, i) => (
                        <Typography key={i} variant="body1">
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            File{" " + i}
                          </a>
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </>
              )}
            </Card>
          )}
        </List>
      </Dialog>
    </div>
  );
};
export default ParticipantsDialog;
