//;
import CardHeader from "@mui/material/CardHeader";
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { useContext } from "react";
import CardContext from "../../../CardContext";

const TasksDescription = () => {
  const { card } = useContext(CardContext);
  console.log("card", card);

  return (
    <div>
      <Card>
        <CardHeader
          title={
            <Typography component="div" variant="h4">
              Instructions
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body1">{card.description}</Typography>
          </Stack>
        </CardContent>
        <CardHeader
          title={
            <Typography component="div" variant="h4">
              Category
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body1">{card.category}</Typography>
          </Stack>
        </CardContent>
        <Divider />
        <CardHeader
          title={
            <Typography component="div" variant="h4">
              Recommended Skills
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Stack direction="row" spacing={1}>
            {card.RecommendedSkills.map((skill, i) => (
              <Chip key={i} label={skill} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksDescription;
