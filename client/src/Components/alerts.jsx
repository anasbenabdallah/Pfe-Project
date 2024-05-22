import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Alert from "@mui/material/Alert";

const AlertContainer = ({ error }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Determine the message to display
  const defaultMessage = "An error occurred";
  const message =
    error?.error?.msg || error?.msg || error?.error || error || defaultMessage;

  return (
    <Alert
      severity="error"
      sx={{
        position: "fixed",
        top: "32%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        opacity: open ? 1 : 0,
        transition: "opacity 1s ease-out",
      }}
    >
      {open && (
        <>
          {message} <strong>check it out!</strong>
        </>
      )}
    </Alert>
  );
};

// Define PropTypes for the component
AlertContainer.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Ensure error can be a string or an object
};

export default AlertContainer;
