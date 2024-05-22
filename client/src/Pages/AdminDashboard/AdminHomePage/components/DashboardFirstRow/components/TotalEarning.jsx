//;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const TotalEarning = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignItems={"flex-end"}
            columnGap={"0.5rem"}
          >
            <CreditCardIcon />
            <Typography>Total Earning</Typography>
          </Stack>
          <Typography component="p" variant="h4">
            $1
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default TotalEarning;
