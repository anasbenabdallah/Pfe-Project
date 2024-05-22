import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertSuccess = ({ message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        <strong>Successfully {message}!</strong>
      </Alert>
    </Snackbar>
  );
};

// Define PropTypes for the component
AlertSuccess.propTypes = {
  message: PropTypes.string.isRequired, // Ensure message is a required string
};

export default AlertSuccess;
