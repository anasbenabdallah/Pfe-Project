import { useState, useRef, useEffect } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Container,
} from "@mui/material";

const Webcam = ({ onCapture }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    const getMedia = async () => {
      const constraints = { audio: false, video: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL();
    setShowCamera(false);
    onCapture(imageUrl);
  };

  return (
    <div>
      {showCamera ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="400"
            height="320"
          />
          <Button
            style={{ bottom: "0" }}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            onClick={captureImage}
          >
            Capture Image
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Webcam;
