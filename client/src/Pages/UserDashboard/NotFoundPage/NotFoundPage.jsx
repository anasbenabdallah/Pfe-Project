//;
import { Box, Button, Stack, Typography } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

const primary = grey[500]; // #f44336

const NotFoundPage = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: primary,
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          <Typography variant="h1" style={{ color: "white" }}>
            404
          </Typography>
          <Typography variant="h6" style={{ color: "white" }}>
            The page you’re looking for doesn’t exist.
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Back Home
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default NotFoundPage;
