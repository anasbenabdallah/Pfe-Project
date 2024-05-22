import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import { Box, Stack } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../../../../../../redux/reducers/AdminReducer";
import { getUsers } from "../../../../../../redux/actions/AdminAction";

const TotalUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const Users = useSelector(selectUsers);

  const number = Users.length;

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignItems={"flex-end"}
            columnGap={"0.5rem"}
          >
            <GroupIcon />
            <Typography>Total Users</Typography>
          </Stack>
          <Typography component="p" variant="h4">
            {number}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default TotalUsers;
