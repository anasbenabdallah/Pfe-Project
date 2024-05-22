import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Grid, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../src/redux/actions/CategoryAction";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Category.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {categories.map(
          (badgeData) =>
            badgeData && (
              <Grid item key={badgeData._id} lg={3} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <Stack
                      alignItems={"center"}
                      flexDirection={"row"}
                      columnGap={1}
                    >
                      <Typography variant="h5">Category :</Typography>
                      <Typography variant="h5" noWrap color={"primary.dark"}>
                        {badgeData.name}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
};

export default Categories;
