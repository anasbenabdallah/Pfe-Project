//;
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Stack } from "@mui/material";

const data = [
  {
    id: 1,
    title: "Shrimp and Chorizo Paella",
    subheader: "September 14, 2016",
  },
  { id: 2, title: "Baked Ziti with Sausage", subheader: "July 4, 2022" },
  { id: 3, title: "Chicken Parmesan", subheader: "May 20, 2021" },
];

const SearchContent = () => {
  return (
    <>
      <Stack spacing={2}>
        {data.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardHeader
              avatar={<Avatar>R</Avatar>}
              action={
                <Box textAlign="center" sx={{ padding: 0 }}>
                  <Button variant="outlined">Follow</Button>
                </Box>
              }
              title={item.title}
              subheader={item.subheader}
            />
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default SearchContent;
