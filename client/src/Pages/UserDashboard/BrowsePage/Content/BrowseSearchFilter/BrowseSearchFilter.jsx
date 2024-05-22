//;
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const BrowseSearchFilter = () => {
  return (
    <Paper
      variant="outlined"
      square
      component="form"
      sx={{
        p: "2px 10px",
        display: "flex",
        alignItems: "center",
        //width: "240px",
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
      <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
        <SearchIcon sx={{ color: "#7C7C7A" }} />
      </IconButton>
    </Paper>
  );
};

export default BrowseSearchFilter;
