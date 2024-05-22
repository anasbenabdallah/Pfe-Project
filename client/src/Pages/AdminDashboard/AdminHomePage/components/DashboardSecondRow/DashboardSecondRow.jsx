import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UsersHistoryChart from "./components/UsersHistoryChart";
import MonthlyBarChart from "./components/MonthlyBarChart";

const DashboardSecondRow = () => {
  const [slot, setSlot] = useState("week");

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} lg={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h6">User Analytics</Typography>
              </Stack>
              <Grid item xs={12}>
                <UsersHistoryChart />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h6">This Week Statistics</Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
              <Grid item xs={12}>
                <MonthlyBarChart />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardSecondRow;
