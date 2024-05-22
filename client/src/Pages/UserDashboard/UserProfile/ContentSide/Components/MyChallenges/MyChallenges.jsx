import { useState, useEffect } from "react";
import { makeStyles, styled } from "@mui/styles";
import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Pagination,
  Typography,
  Box,
  CardActionArea,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCompanyChallenges,
  selectUserChallenges,
} from "../../../../../../redux/reducers/ChallengeReducer";
import {
  getCompanyChallenges,
  getUserChallenges,
} from "../../../../../../redux/actions/ChallengeAction";
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";
import getDeadlineDifference from "../../../../ContestDescriptionPage/TopSide/deadlineModif";
import CardOptions from "./CardOptions";

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

const MyChallenges = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [myChallenges, setMyChallenges] = useState([]);

  const user = localStorage.getItem("user");

  const myData = JSON.parse(user);

  useEffect(() => {
    if (myData.role === "tester") {
      dispatch(getCompanyChallenges(myData._id));
    } else {
      dispatch(getUserChallenges(myData._id));
    }
  }, [dispatch, myData._id, myData.role]);

  const challenges = useSelector(selectUserChallenges);
  const companyChallenges = useSelector(selectCompanyChallenges);

  const updatedChallenges =
    myData.role === "tester" ? companyChallenges : challenges;

  useEffect(() => {
    setMyChallenges(updatedChallenges);
  }, [updatedChallenges]);

  console.log(myChallenges);

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  return (
    <Stack>
      <Divider />
      <Grid container columnSpacing={2}>
        {myChallenges.length > 0 &&
          myChallenges.map((card) => (
            <Grid item key={card._id} xs={12} md={6}>
              <CustomLink
                to={{
                  pathname: `/browse/contestDetails/${card._id}`,
                }}
                state={{ card }}
              >
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
                    image={
                      card.companyId.picturePath
                        ? card.companyId.picturePath
                        : myData.picturePath
                    }
                    title={card.companyId.companyName}
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
                            {card.companyId.companyName}
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
                              {card.users.length}
                            </Typography>
                            <Typography variant="body1">
                              Participants
                            </Typography>
                          </Stack>
                          <Button
                            color={handleProgress(card) ? "success" : "error"}
                            className={classes.gridItem}
                            style={{ padding: 0 }}
                          >
                            {handleProgress(card) ? "In Progress" : "Finished"}
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </div>
                </Card>
              </CustomLink>
              <CardOptions sx={{ display: "flex", position: "relative" }} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default MyChallenges;
