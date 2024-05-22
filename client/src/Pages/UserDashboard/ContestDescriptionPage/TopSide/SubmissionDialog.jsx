import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Button, Divider, Grid, TextField, Box, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import storage from "../../../../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitChallenge } from "../../../../redux/actions/ChallengeAction";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 10%",
    [theme.breakpoints.down("lg")]: {
      padding: "40px 6%",
    },
    [theme.breakpoints.down("md")]: {
      padding: "40px 4%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "40px 2%",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "40px 2%",
    },
  },
  uploadFilesArea: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    height: "250px",
    border: "1px dotted black",
    margin: "1rem 2rem",
    [theme.breakpoints.down("lg")]: {
      margin: "1rem 0rem",
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: "1rem 0rem",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const maxSize = 5 * 1024 * 1024; // 5 megabytes

const SubmissionDialog = ({ open, handleClose, setIsSubmitted }) => {
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);
  const [filesSelected, setFilesSelected] = useState([]);
  const [SubmissionTitle, setSubmissionTitle] = useState("");
  const [SubmissionDescription, setSubmissionDescription] = useState("");
  const [filesPaths, setFilesPaths] = useState([]);

  const myData = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, `files/${myData._id}+${id}+${file.name}`);
    console.log(fileRef);
    const uploadTask = uploadBytesResumable(fileRef, file);
    try {
      const snapshot = await uploadTask;
      const url = await getDownloadURL(fileRef);
      setFilesPaths((prev) => [...prev, url]);
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const data = dispatch(
      submitChallenge({
        challengeId: id,
        userId: myData._id,
        title: SubmissionTitle,
        description: SubmissionDescription,
        filesPaths: filesPaths,
      })
    ).catch((err) => {
      console.log(err);
    });
    if (data) {
      setIsSubmitted(true);
      handleClose();
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
  };

  const validFiles = [];
  const invalidFiles = [];

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    handleFiles(files);
    for (const file of validFiles) {
      file.url = await handleFileUpload(file);
      setFilesSelected([...filesSelected, file]);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        file.type !== "application/zip" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/avi" &&
        file.size <= maxSize
      ) {
        validFiles.push(file);
        setFilesSelected([...filesSelected, file]);
      } else {
        invalidFiles.push(file);
      }
    }

    console.log("Valid files:", validFiles);
    console.log("Invalid files:", invalidFiles);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              SUBMIT YOUR WORK
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.root}>
          <Grid container rowGap={2} alignItems="flex-start">
            <Grid item lg={12}>
              <Stack spacing={2}>
                <Typography variant="h3">
                  Need a logo for an ecommerce business
                </Typography>
                <Divider />
              </Stack>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Stack spacing={3}>
                  <TextField
                    label="Enter your Submission Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => {
                      setSubmissionTitle(e.target.value);
                    }}
                  />
                  <TextField
                    label="Describe your submission"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={6}
                    variant="outlined"
                    onChange={(e) => {
                      setSubmissionDescription(e.target.value);
                    }}
                  />
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    {filesSelected.length > 0 &&
                      filesSelected.map((file) => {
                        return (
                          <Typography key={file.name}>
                            {" "}
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </Typography>
                        );
                      })}
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={
                      !(filesPaths.length === filesSelected.length
                        ? true
                        : false)
                    }
                  >
                    Submit your work
                  </Button>
                </Stack>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box
                  className={classes.uploadFilesArea}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Stack spacing={2} alignItems={"center"}>
                    <Typography>
                      Drag and drop your files here or click to upload
                    </Typography>
                    <input
                      hidden
                      accept=".jpg,.jpeg,.png,.gif,.mp4,.avi,.zip,application/*"
                      type="file"
                      id="fileInput"
                      onChange={handleFileSelect}
                      multiple
                    />
                    <label htmlFor="fileInput">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Your Files
                      </Button>
                    </label>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
};

export default SubmissionDialog;
