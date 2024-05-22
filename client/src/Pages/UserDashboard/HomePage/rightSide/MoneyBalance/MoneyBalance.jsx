//;
import {
  Typography,
  Stack,
  Box,
  Card,
  Avatar,
  CardHeader,
} from "@mui/material";
import styled from "styled-components";

const CustomizedCard = styled(Card)((theme) => ({
  padding: 15,
  borderRadius: "0.5rem",
}));

const myData = JSON.parse(localStorage.getItem("user"));

const MoneyBalance = () => {
  return (
    <div>
      <CustomizedCard elevation={0} variant="outlined">
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography variant="h4">Balance</Typography>
          <Typography variant="h4" color={"primary"}>
            {myData?.balance} $
          </Typography>
        </Stack>
      </CustomizedCard>
    </div>
  );
};

export default MoneyBalance;
