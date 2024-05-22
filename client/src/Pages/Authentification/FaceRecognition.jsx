import { useEffect, useState } from "react";
import Webcam from "./components/Webcam";
import FirebaseSocialIcons from "./components/FirebaseSocialIcons";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Cloudinary } from "@cloudinary/base";
import { verifyface } from "../../redux/actions/AuthAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addface } from "../../redux/actions/AuthAction";
import { useSelector } from "react-redux";
import { selectError } from "../../redux/reducers/AuthReducer";
import AlertContainer from "../../Components/alerts";

export default function FaceRecognition({ mode }) {
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "dvko9nyty",
      apiKey: "799792456131682",
      apiSecret: "HbK9IMnTgkT5SYfh7hQlskL7oFg",
    },
  });

  const handleShowWebcam = () => {
    setShowWebcam(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowWebcam(false);
    setCapturedImage(null);
  };

  const handleCapture = (imageUrl) => {
    setCapturedImage(imageUrl);
    setShowWebcam(false); // Hide the webcam
  };

  const handleRetake = () => {
    setShowWebcam(true);
    setCapturedImage(null);
  };

  const handleVerify = async () => {
    // Upload the image to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dvko9nyty/image/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: capturedImage,
          upload_preset: "jwdtq1bl",
        }),
      }
    );

    const user = JSON.parse(localStorage.getItem("user"));
    const data = await response.json();
    console.log(data);
    const imageUrl = data.secure_url;

    alert("Image Verified!");
    console.log(imageUrl);
    console.log(mode);
    if (mode == "verify") {
      const data = await dispatch(verifyface({ photoUrl: imageUrl }));
      if (data) window.location.reload();
    } // Reload the page to update the local storage
    else {
      console.log(user.email);
      await dispatch(addface({ photoUrl: imageUrl, email: user.email }));
    }

    handleClose();
  };

  const error = useSelector(selectError);
  return (
    <>
      <AlertContainer error={error} />
      <FirebaseSocialIcons
        showbutton={true}
        handleShowWebcam={handleShowWebcam}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialogContent-root": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          },
        }}
      >
        <DialogTitle>Face Recognition</DialogTitle>
        <DialogContent>
          {showWebcam && <Webcam onCapture={handleCapture} />}

          {capturedImage && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={capturedImage}
                alt="Captured Image"
                width="400"
                height="320"
              />
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="warning"
                  onClick={handleRetake}
                >
                  Retake Image
                </Button>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleVerify}
                >
                  Verify Image
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
