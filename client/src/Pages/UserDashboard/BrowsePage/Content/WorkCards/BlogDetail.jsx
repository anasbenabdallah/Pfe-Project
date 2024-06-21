import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:8000/event/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setEvent(data.event);
      setInputs({
        title: data.event.title,
        description: data.event.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:8000/event/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(event);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate(`/profile/${event.tester}`));
  };

  return (
    <Box
      border={3}
      borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
      borderRadius={10}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin={"auto"}
      marginTop={3}
      display="flex"
      flexDirection={"column"}
      width={"80%"}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography
        fontWeight={"bold"}
        padding={3}
        color="grey"
        variant="h2"
        textAlign={"center"}
      >
        Update Your Event
      </Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField
        name="title"
        onChange={handleChange}
        value={inputs.title}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="title"
        autoFocus
      />
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField
        name="description"
        onChange={handleChange}
        value={inputs.description}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="description"
        multiline
        rows={4}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Your Event
      </Button>
    </Box>
  );
};

export default BlogDetail;
