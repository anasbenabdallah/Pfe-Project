import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button, Divider, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { userEditProfile } from "../../../../redux/actions/userProfileAction";
import { useEffect } from "react";
import FaceRecognition from "../../../../Pages/Authentification/FaceRecognition";
import { useSelector } from "react-redux";
import { selectisFaceRecog } from "../../../../redux/reducers/AuthReducer";
import AlertSuccess from "../../../../Components/successalert";
import { selectSuccess as selectCompanySuccess } from "../../../../redux/reducers/companyProfileReducer";
import { selectSuccess as selectUserSuccess } from "../../../../redux/reducers/userProfileReducer";
import { companyEditProfile } from "../../../../redux/actions/companyProfileAction";

export default function Privacy() {
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const myData = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({});

  const isCompanySuccess = useSelector(selectCompanySuccess);
  const isUserSuccess = useSelector(selectUserSuccess);

  const isFaceRecognition = useSelector(selectisFaceRecog);

  console.log(myData._id);
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedFormData = {
      password: password,
    };
    if (myData.role == "tester") {
      dispatch(companyEditProfile(updatedFormData, myData));
    } else {
      dispatch(userEditProfile(updatedFormData, myData));
    }
  };

  const handleRetypePasswordChange = (e) => {
    const retypePassword = e.target.value;
    if (password !== retypePassword) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5" gutterBottom>
          Privacy Informations
        </Typography>
        <Divider />
        {myData.role == "user" && (
          <Grid item xs={4}>
            <div
              style={{
                position: "relative",
                display: "flex",
              }}
            >
              <FaceRecognition mode="add" />
              <p
                style={{
                  backgroundColor: isFaceRecognition === true ? "green" : "red",
                  color: "white",
                  padding: "5px",
                }}
              >
                {isFaceRecognition ? "Enabled" : "Disabled"}
              </p>
            </div>
          </Grid>
        )}
        <Divider />
        <br />
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel shrink={true}>New Password</InputLabel>
            <TextField
              required
              name="newpassword"
              type="password"
              placeholder="New password"
              fullWidth
              autoComplete="newpassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink={true}>Retype Password</InputLabel>
            <TextField
              required
              name="retypepassword"
              type="password"
              placeholder="Retype password"
              fullWidth
              autoComplete="retypepassword"
              onChange={(e) => {
                setPasswordVerification(e.target.value);
                handleRetypePasswordChange(e);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              disabled={!isSaveDisabled}
            >
              Save
            </Button>
            {isCompanySuccess && (
              <AlertSuccess message={"changed your password"} />
            )}
            {isUserSuccess && (
              <AlertSuccess message={"changed your password"} />
            )}
          </Grid>
        </Grid>
      </Stack>
    </React.Fragment>
  );
}
