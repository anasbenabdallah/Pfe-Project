import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { Button, Divider, InputLabel } from "@mui/material";
import AuthWrapper from "./components/AuthWrapper";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/AuthAction";
import { useNavigate, useParams } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">WyPlay</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Privacy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const { resetToken } = useParams();
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(resetPassword({ resetToken, password }));
    console.log(data);
    if (data) navigate("/login");
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
    <AuthWrapper>
      <Stack spacing={5} sx={{ width: "70%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1} display={"flex"} alignItems={"center"}>
              <Typography component="h1" variant="h1" color="primary">
                WyPlay
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="email-login">New Password</InputLabel>
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
            <InputLabel htmlFor="email-login">Retype Password</InputLabel>
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
              onClick={(e) => submitHandler(e)}
              disabled={!isSaveDisabled}
              fullWidth
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Copyright />
      </Stack>
    </AuthWrapper>
  );
}
