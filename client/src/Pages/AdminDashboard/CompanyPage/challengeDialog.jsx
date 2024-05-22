import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";

import {
  getCompanyChallenges,
  getUserSubmitChallenge,
} from "../../../redux/actions/ChallengeAction";
import StarIcon from "@mui/icons-material/Star";
import { Grid } from "@mui/material";
import {
  CardMedia,
  Rating,
  Pagination,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import CardOptions from "../../UserDashboard/MyContentPage/CardOptions";
import BrowseSearchFilter from "../../UserDashboard/BrowsePage/Content/BrowseSearchFilter/BrowseSearchFilter";
import { useSelector } from "react-redux";
import {
  selectCompanyChallenges,
  selectUserChallenges,
} from "../../../redux/reducers/ChallengeReducer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 120,
    height: 120,
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "15px",
  },
}));

const CustomLink = styled(Link)((theme) => ({
  textDecoration: "none",
}));

const ChallengeDialog = ({ open, handleClose, tester }) => {
  const classes = useStyles();

  const [data, setData] = React.useState(null);
  const [challenges, setChallenges] = React.useState(null);

  const [page, setPage] = useState(1);

  const cardsPerPage = 10; //paginate 3 per page
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;
  console.log(tester);

  const selectChallenges = useSelector(selectCompanyChallenges);

  useEffect(() => {
    setChallenges(selectChallenges);
  }, [selectChallenges]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(tester);
        const result = await dispatch(getCompanyChallenges(tester._id));
        console.log("resultat", result);
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(data);
  console.log(challenges);

  const totalPages = Math.ceil(challenges?.length / cardsPerPage);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
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
              Tester Challenges
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
        <Stack m={"0px 200px"}>
          <br />
          <Divider />
          <Grid item xs={12}>
            <BrowseSearchFilter />
          </Grid>
          <br />
          <Divider />
          <Stack flexDirection={"column"} alignItems={"flex-end"}>
            {challenges?.length > 0 &&
              challenges.slice(startIndex, endIndex).map((card) => (
                <CardActionArea key={card._id}>
                  <Card
                    className={classes.root}
                    sx={{
                      ":hover": {
                        boxShadow: "5",
                      },
                    }}
                  >
                    <CardMedia
                      className={classes.cover}
                      image={tester.picturePath}
                      title={tester.companyName}
                      sx={{ display: { xs: "none", sm: "block" } }}
                    />
                    <div className={classes.content}>
                      <CardContent>
                        <Stack spacing={2}>
                          <Box>
                            <Typography
                              component="h5"
                              variant="h5"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace={"normal"}
                            >
                              {tester.companyName}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              whiteSpace={"normal"}
                            >
                              {card.description}
                            </Typography>
                          </Box>

                          <Stack
                            flexDirection={"row"}
                            alignItems={"flex-end"}
                            columnGap={"1rem"}
                          >
                            <Stack
                              display={"flex"}
                              flexDirection={"row"}
                              alignItems={"flex-end"}
                            >
                              <Rating
                                name={`rating-${card._id}`}
                                value={card.totatlStars}
                                precision={0.5}
                                readOnly
                                icon={<StarIcon className={classes.icon} />}
                              />
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                              >
                                ({card.totalStars})
                              </Typography>
                            </Stack>

                            <Stack flexDirection={"row"} columnGap={"0.3rem"}>
                              <Typography variant="subtitle1" color={"primary"}>
                                {card.price}$
                              </Typography>
                              <Typography variant="body1" color={"primary"}>
                                Prize
                              </Typography>
                            </Stack>
                            <Stack flexDirection={"row"} columnGap={"0.3rem"}>
                              <Typography variant="subtitle1">
                                {/* {card.participants} */}
                              </Typography>
                              <Typography variant="body1">
                                Participants
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </div>
                  </Card>
                  <CardOptions id={card._id} />
                </CardActionArea>
              ))}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
            />
          </Stack>
        </Stack>

        <List></List>
      </Dialog>
    </div>
  );
};
export default ChallengeDialog;
