import Switch from "@mui/material/Switch";

const DarkMode = ({ checked, handleChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default DarkMode;
