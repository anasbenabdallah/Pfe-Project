import { useState } from "react";
import { Box, TextField, Button, Grid, Autocomplete } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { addChallenge } from "../../../../../redux/actions/ChallengeAction";
import moment from "moment";
import AlertContainer from "../../../../../Components/alerts";
import {
  selectError,
  selectSuccess,
} from "../../../../../redux/reducers/ChallengeReducer";
import { useSelector } from "react-redux";
import AlertSuccess from "../../../../../Components/successalert";
import { useEffect } from "react";

function ChallengeForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  const [RecommendedSkills, setRecommendedSkills] = useState([]);

  const [isActionCompleted, setIsActionCompleted] = useState(false);

  const isSuccess = useSelector(selectSuccess);

  const companyId = JSON.parse(localStorage.getItem("user"))._id;
  const dispatch = useDispatch();
  console.log(deadline);

  console.log(RecommendedSkills);

  const Error = useSelector(selectError);
  console.log(Error);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await dispatch(
      addChallenge({
        companyId,
        title,
        description,
        category,
        price,
        deadline,
        RecommendedSkills,
      })
    );
    if (data) {
      const timeoutId = setTimeout(() => {
        onClose();
        window.location.reload();
      }, 3000); // set the timeout to 3 seconds (3000 milliseconds)

      return () => clearTimeout(timeoutId);
    }
    setIsActionCompleted(true);
  };

  const handleDeadlineChange = (event) => {
    const selectedDate = event.target.value;
    const now = moment();
    const diff = moment(deadline).diff(now);

    if (diff < 0) {
      setDeadline("");
      event.target.blur();
      return false;
    }

    setDeadline(selectedDate + ":00");
  };

  const handleAutocompleteChange = (event, newValue) => {
    setRecommendedSkills(newValue);
    console.log(newValue);
  };

  const now = new Date().toISOString().slice(0, -8);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%" }}
      spacing={4}
      lang="en"
    >
      <TextField
        required
        fullWidth
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Grid item xs={12} md={12}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={itSkills}
          getOptionLabel={(option) => option}
          defaultValue={[itSkills[0]]}
          onChange={handleAutocompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Recommended Skills"
              placeholder="Skills"
            />
          )}
        />
      </Grid>

      <TextField
        required
        fullWidth
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        multiline
        rows={4}
      />
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} md={5}>
          <TextField
            required
            fullWidth
            label="Prize"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </Grid>
      </Grid>

      {isActionCompleted && <AlertContainer error={Error} />}
      {isSuccess && <AlertSuccess message={"created the challenge"} />}
      <TextField
        required
        fullWidth
        label="Deadline"
        type="datetime-local"
        value={deadline}
        onChange={handleDeadlineChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: now,
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Create Challenge
        </Button>
        <Button sx={{ ml: 2 }} variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Stack>
  );
}

export default ChallengeForm;

const itSkills = [
  "any",
  "Python",
  "Java",
  "JavaScript",
  "C++",
  "C#",
  "HTML",
  "CSS",
  "SQL",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
  "Big Data",
  "Cloud Computing",
  "Cybersecurity",
  "Blockchain",
  "Mobile App Development",
  "Web Development",
  "DevOps",
  "Agile Methodology",
  "Project Management",
  "UI/UX Design",
  "Digital Marketing",
  "Content Management System",
  "Network Administration",
  "Virtualization",
  "Linux Administration",
  "Windows Administration",
  "ITIL",
  "Microsoft Azure",
  "Amazon Web Services (AWS)",
  "Google Cloud Platform (GCP)",
];
