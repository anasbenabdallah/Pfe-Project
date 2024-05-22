import { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

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
  useMediaQuery,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Stack } from "@mui/system";
import ParticipantsDialog from "./ParticipantsDialog";
import { getChallengeUsers } from "../../../../../../redux/actions/ChallengeAction";
import { useDispatch, useSelector } from "react-redux";
import { selectChallengeUsers } from "../../../../../../redux/reducers/ChallengeReducer";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const ParticipantsTable = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const users = useSelector(selectChallengeUsers);

  useEffect(() => {
    dispatch(getChallengeUsers(id)).catch((err) => {
      console.log(err);
    });
  }, [dispatch, users]);

  console.log(users);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (row) => {
    setModalOpen(true);
    setSelectedRow(row);
    console.log(row);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  console.log(users);

  return (
    <div>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RANK</TableCell>
              <TableCell>USERNAME</TableCell>
              <TableCell>REGISTRATION DATE</TableCell>
              <TableCell align="right">SUBMISSION DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => {
                console.log("user._id:");
                return (
                  <TableRow
                    key={user._id}
                    hover
                    onClick={() => handleOpen(user)}
                  >
                    <TableCell>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"flex-end"}
                        columnGap={1}
                      >
                        <EmojiEventsIcon />
                        <Typography variant="h5">{index + 1} </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        columnGap={2}
                      >
                        {
                          <Avatar
                            src={user.picturePath}
                            className={classes.avatar}
                          />
                        }
                        <Stack flexDirection={"row"} columnGap={1}>
                          <Typography variant="h6">{user.firstname}</Typography>
                          <Typography variant="h6">{user.lastname}</Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {/* <Typography variant="h6">{user.submissionDate}</Typography> */}
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" align="right">
                        {/* {user.registrationDate} */}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {modalOpen && (
          <ParticipantsDialog
            open={modalOpen}
            selectedRow={selectedRow}
            handleClose={handleClose}
            userId={selectedRow?._id}
            user={selectedRow}
          />
        )}
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

export default ParticipantsTable;
