//;
import { Container, Box } from "@mui/material";

const AuthWrapper = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default AuthWrapper;
