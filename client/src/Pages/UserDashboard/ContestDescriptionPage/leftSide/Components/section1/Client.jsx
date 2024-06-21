//;
import { Card, Avatar, Typography, Box, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import CardContext from "../../../CardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5% 4%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      padding: "5% 2%",
    },
  },
}));
const ClientCard = () => {
  const classes = useStyles();
  const { card } = useContext(CardContext);
  console.log(card);
  const myData = JSON.parse(localStorage.getItem("user"));

  return (
    <Card className={classes.root}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h4">About the client</Typography>
          <Divider />
        </Stack>
        <Stack flexDirection={"row"} columnGap={"1rem"}>
          <Avatar
            src={card.testerId.picturePath || myData.picturePath}
            sx={{ bgcolor: "secondary", width: 50, height: 50 }}
            aria-label="client"
          ></Avatar>
          <Stack>
            <Stack display={"flex"} flexDirection={"row"} columnGap={1}>
              <Typography variant="h5">
                {card.testerId.testerName || myData.testerName}{" "}
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <StarIcon sx={{ color: "#f50057" }} />
              <Typography sx={{ ml: 1 }}>4.5 (35 reviews)</Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ClientCard;
