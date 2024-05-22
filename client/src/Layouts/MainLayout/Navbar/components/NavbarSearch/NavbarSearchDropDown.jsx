import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getsuggestedUsers } from "../../../../../redux/actions/UserAction";
import { SearchUsers } from "../../../../../redux/actions/UserAction";
import { Avatar, Stack, Typography } from "@mui/material";

export default function NavbarSearchDropDown() {
  const [searchqueryNavigation, setQueryNavigation] = useState("");

  const dispatch = useDispatch();
  const suggestedusers = useSelector((state) => state.User.suggestedUsers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getsuggestedUsers()).catch(() =>
      console.log("Error loading users")
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(SearchUsers(searchqueryNavigation));
  }, [dispatch, searchqueryNavigation]);

  const handleSearchUsers = (event) => {
    setQueryNavigation(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchqueryNavigation) {
      const selectedUser = suggestedusers.find(
        (user) => `${user.firstname} ${user.lastname}` === searchqueryNavigation
      );
      if (selectedUser) {
        navigate(`/profile/${selectedUser._id}`);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ borderRadius: 20 }}
      value={searchqueryNavigation}
      onChange={handleSearchUsers}
      onKeyDown={handleKeyDown}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={suggestedusers}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return `${option.firstname} ${option.lastname}`;
      }}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            columnGap={1}
            key={option._id}
          >
            <Avatar src={option.picturePath} />
            <Stack flexDirection={"row"} columnGap={1}>
              <Typography variant="h6" fontWeight={"bold"}>
                <Link
                  to={`/profile/${option._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {option.firstname} {option.lastname}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          sx={{ width: 265 }}
          value={searchqueryNavigation}
          onChange={handleSearchUsers}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}
