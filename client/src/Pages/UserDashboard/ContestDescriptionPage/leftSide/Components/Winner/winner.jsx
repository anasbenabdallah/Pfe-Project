import { Select, Button, Grid, MenuItem, InputLabel } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  chooseWinner,
  getChallengeUsers,
} from "../../../../../../redux/actions/ChallengeAction";
import { selectChallengeUsers } from "../../../../../../redux/reducers/ChallengeReducer";
import AuthWrapper from "../../../../../Authentification/components/AuthWrapper";

const ChooseWinner = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const myData = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  useEffect(() => {
    async function fetchData() {
      return await dispatch(getChallengeUsers(id));
    }
    fetchData();
  }, [dispatch, id]);

  const data = useSelector(selectChallengeUsers);
  console.log(data);

  const handleSubmit = async () => {
    const companyId = myData._id;
    const winnerId = selectedUser._id;
    console.log(selectedUser);
    await dispatch(
      chooseWinner({ idChallenge: id, idCompany: companyId, idUser: winnerId })
    );
    console.log("done winner is", selectedUser.firstname);
    window.location.reload();
  };

  return (
    <Stack spacing={5} sx={{ width: "50%", margin: "0 auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <InputLabel id="demo-simple-select-label">
            Select an Option
          </InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUser}
            label="Select an Option"
            fullWidth
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            {data.map((user) => (
              <MenuItem value={user} key={user._id}>
                {`${user.firstname} ${user.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          ></Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Verify !
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChooseWinner;
