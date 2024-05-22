import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import { getChallenges } from "../../../../../redux/actions/ChallengeAction";
import { useDispatch } from "react-redux";

const ContestsFilters = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getChallenges(minAmount, maxAmount, searchQuery));
  }, [dispatch, minAmount, maxAmount, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinChange = (event) => {
    setMinAmount(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <div>
              <Stack spacing={1}>
                <Typography variant="h4">Filters</Typography>
                <div>
                  <TextField
                    label="Search Contest"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </Stack>
            </div>
            <Stack>
              <form noValidate autoComplete="off">
                <Stack spacing={2}>
                  <Typography variant="body1" fontWeight={"bold"}>
                    Contest Prize
                  </Typography>

                  <TextField
                    id="min-amount"
                    label="Min Amount"
                    type="number"
                    value={minAmount}
                    onChange={handleMinChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaidIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="max-amount"
                    label="Max Amount"
                    type="number"
                    value={maxAmount}
                    onChange={handleMaxChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaidIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </form>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContestsFilters;
