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
  const [sortedUsers, setSortedUsers] = useState([]);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.User.searchResults);

  useEffect(() => {
    dispatch(getAllUsers()).catch(() => console.log("Error loading posts"));
  }, [dispatch]);

  useEffect(() => {
    if (users && users.length > 0) {
      const sorted = [...users].sort((a, b) => b.score - a.score);
      setSortedUsers(sorted);
    }
  }, [users]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            {sortedUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"flex-end"}
                      columnGap={1}
                    >
                      <EmojiEventsIcon />
                      <Typography variant="h5">
                        {page * rowsPerPage + index + 1}
                      </Typography>
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
          rowsPerPageOptions={[8, 10, 25, 100]}
          component="div"
          count={sortedUsers.length}
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
