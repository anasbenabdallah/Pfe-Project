import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { SearchUsers } from "../../../../../redux/actions/UserAction";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "2px 10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "0 auto",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: "5px",
  },
  SearchIconColor: {
    color: "#7C7C7A",
  },
}));

const SearchbarFilter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(SearchUsers(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Paper variant="outlined" square component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon className={classes.SearchIconColor} />
      </IconButton>
    </Paper>
  );
};

export default SearchbarFilter;
