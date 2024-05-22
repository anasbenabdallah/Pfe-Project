import { useState } from "react";
import AuthWrapper from "./components/AuthWrapper";
import { useDispatch } from "react-redux";

// material-ui
import {
  Button,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import { forgetPassword } from "../../redux/actions/AuthAction";
import Link from "@mui/material/Link";

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

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, SetEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(forgetPassword({ email }));
    console.log(data);
    if (data.message) alert("Password reset email sent");
    else if (data.error) alert("Email not found");
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
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                name="email"
                placeholder="Enter email address"
                fullWidth
                onChange={(e) => SetEmail(e.target.value)}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => submitHandler(e)}
            >
              send mail
            </Button>
          </Grid>
        </Grid>
        <Copyright />
      </Stack>
    </AuthWrapper>
  );
};

export default ForgetPassword;
