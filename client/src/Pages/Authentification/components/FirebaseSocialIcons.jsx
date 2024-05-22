// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Button, Stack } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

// assets
import Google from "../../../assets/images/icons/google.svg";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FireBaseSocialIcons = ({
  showbutton,
  handleSignIn,
  handleShowWebcam,
}) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? "space-around" : "space-between"}
      sx={{
        px: matchDownSM ? 0 : 2, // add padding to the stack
        marginTop: "1rem", // add margin to the top of the stack
        "& .MuiButton-startIcon": {
          m: matchDownSM ? 0 : 1,
          marginLeft: matchDownSM ? "0.5rem" : "1rem", // add margin to the left of the startIcon
        },
      }}
    >
      {!showbutton && (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<img src={Google} alt="Google" />}
          onClick={handleSignIn}
        >
          {!matchDownSM && "Google"}
        </Button>
      )}
      {showbutton && (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<FaceIcon />}
          onClick={handleShowWebcam}
        >
          {!matchDownSM && "Face Recognition"}
        </Button>
      )}
    </Stack>
  );
};

export default FireBaseSocialIcons;
