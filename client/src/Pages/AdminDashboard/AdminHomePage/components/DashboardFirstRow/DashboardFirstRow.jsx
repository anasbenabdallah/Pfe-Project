import { Box, Grid } from "@mui/material";
//;
import NewUsers from "./components/NewUsers";
import TotalUsers from "./components/TotalUsers";
import TotalEarning from "./components/TotalEarning";

const DashboardFirstRow = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <TotalEarning />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TotalUsers />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <NewUsers />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardFirstRow;
