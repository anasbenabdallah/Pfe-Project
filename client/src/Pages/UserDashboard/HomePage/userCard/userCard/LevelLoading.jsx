//;
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  color: {
    color: theme.palette.primary.main,
  },
}));

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);

  return (
    <Box sx={{ display: { xs: "none", lg: "block", md: "block" } }}>
      <Stack spacing={1}>
        <Stack>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} columnGap={1}>
            <Typography variant="body1" className={classes.color}>
              Bienvenu !
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const LevelLoading = () => {
  const user = localStorage.getItem("user");
  const myData = JSON.parse(user);
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default LevelLoading;
