import { useState, useEffect } from "react";
import { makeStyles, styled } from "@mui/styles";
import StarIcon from "@mui/icons-material/Star";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Pagination,
  Typography,
  Box,
  CardActionArea,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectChallenges } from "../../../../../redux/reducers/ChallengeReducer";
import { getChallenges } from "../../../../../redux/actions/ChallengeAction";
import { useDispatch } from "react-redux";
import getDeadlineDifference from "../../../ContestDescriptionPage/TopSide/deadlineModif";

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

const ContestCards = ({ minAmount, maxAmount }) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const cardsPerPage = 3; //paginate 3 per page
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;
  const dispatch = useDispatch();

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return false;
    return true;
  };

  useEffect(() => {
    dispatch(getChallenges());
  }, [dispatch]);

  const challenges = useSelector(selectChallenges);
  console.log("ezaea", challenges);
  const totalPages = Math.ceil(challenges.length / cardsPerPage);

  //pagination
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Stack flexDirection={"column"} alignItems={"flex-end"}>
        {challenges.length > 0 &&
          challenges.slice(startIndex, endIndex).map((card) => (
            <CardActionArea key={card._id}>
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
                    image={card.companyId.picturePath}
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
                            {card.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            whiteSpace={"normal"}
                          >
                            {card.companyId.companyName}
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
                            style={{ padding: 0 }}
                            className={classes.gridItem}
                          >
                            {handleProgress(card) ? "In Progress" : "Finished"}
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </div>
                </Card>
              </CustomLink>
            </CardActionArea>
          ))}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default ContestCards;
