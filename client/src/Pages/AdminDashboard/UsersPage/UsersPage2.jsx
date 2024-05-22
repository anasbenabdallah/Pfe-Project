import { useEffect, useState } from "react";

import UserTableMenuItem from "./components/UserTableMenuItem";
import { makeStyles } from "@mui/styles";

//redux imports
import { useSelector } from "react-redux";
import { selectUsers } from "../../../redux/reducers/AdminReducer";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions/AdminAction";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TablePagination,
  Typography,
  Grid,
} from "@mui/material";
import { Stack } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const UsersPage2 = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector(selectUsers);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(users);

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>USER</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Grid
                      container
                      spacing={1}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item lg={2}>
                        <Avatar
                          alt={`${user.firstname} ${user.lastname}`}
                          src={user.picturePath}
                          className={classes.avatar}
                        />
                      </Grid>
                      <Grid item lg={10}>
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography
                            className={classes.name}
                            color="textSecondary"
                            variant="body1"
                          >
                            {user.firstname}
                          </Typography>
                          <Typography variant="body1" className={classes.name}>
                            {user.lastname}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </TableCell>

                  <TableCell className={classes.name}>{user.email}</TableCell>
                  <TableCell>
                    <Typography
                      className={classes.status}
                      style={{
                        backgroundColor:
                          (user.status === "active" && "green") ||
                          (user.status === "disabled" && "red"),
                      }}
                    >
                      {user.status}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.name}>
                    <UserTableMenuItem userId={user._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default UsersPage2;
