import { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

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
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Stack } from "@mui/system";

//--------------------------------------------------Redux-----------------------------------------------//
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../../../../redux/actions/UserAction";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const LeaderbordTable = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.User.searchResults);
  console.log("mmmm", users);

  useEffect(() => {
    dispatch(getAllUsers()).catch(() => console.log("Error loading posts"));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 8));
    setPage(0);
  };

  console.log(users);

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RANK</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>COUNTRY</TableCell>
              <TableCell align="right">POINTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"flex-end"}
                      columnGap={1}
                    >
                      <EmojiEventsIcon />
                      <Typography variant="h5">{user.rank}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      columnGap={2}
                    >
                      <Avatar
                        src={user.picturePath}
                        className={classes.avatar}
                      />
                      <Stack flexDirection={"row"} columnGap={1}>
                        <Typography variant="h6">{user.firstname}</Typography>
                        <Typography variant="h6">{user.lastname}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">{user.country}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="right">
                      {user.score}
                    </Typography>
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

export default LeaderbordTable;
