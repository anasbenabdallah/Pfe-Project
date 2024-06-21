//;
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import UserEdit from "./ProfileInformations/UserEdit";
import TesterEdit from "./ProfileInformations/TesterEdit";

const GeneralInformations = () => {
  const myData = JSON.parse(localStorage.getItem("user"));
  return (
    <React.Fragment>
      <Stack>
        <Typography variant="h5" gutterBottom>
          General Informations
        </Typography>
        <Divider />
        <br />
        {(myData.role === "user" && <UserEdit />) ||
          (myData.role === "admin" && <UserEdit />)}
        {myData.role === "tester" && <TesterEdit />}
      </Stack>
    </React.Fragment>
  );
};
export default GeneralInformations;
