import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      placeholder="Search Job …"
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        style: {
          borderRadius: "25px",
          backgroundColor: "#F6F6F6",
          padding: "5px 10px",
          width: "200px",
          height: "40px",
          marginTop: "50px",
          margin: "auto",
        },
      }}
    />
  );
};

export default SearchBar;
