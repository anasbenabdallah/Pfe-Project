import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import storage from "../../../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { green } from "@mui/material/colors";
import { testerEditProfile } from "../../../../../redux/actions/testerProfileAction";
import countries from "world-countries";
import AlertContainer from "../../../../../Components/alerts";
import AlertSuccess from "../../../../../Components/successalert";
import {
  selectError,
  selectSuccess,
} from "../../../../../redux/reducers/testerProfileReducer";
import { useSelector } from "react-redux";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
}));
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function UserEdit() {
  const myData = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(myData.country || "");
  const [dateoffoundation, setDateoffoundation] = useState(() => {
    const date = new Date(myData.dateoffoundation);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [phone, setPhone] = useState(myData.phoneNumber || "");
  const [isActionCompleted, setIsActionCompleted] = useState(false);

  const countryList = countries.map((country) => country.name.common);

  const isSuccess = useSelector(selectSuccess);
  const Error = useSelector(selectError);
  console.log(Error);

  const handleDateoffoundation = (event) => {
    setDateoffoundation(event.target.value);
    setFormData({ ...formData, dateoffoundation: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setFormData({ ...formData, phoneNumber: event.target.value });
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log(selectedCountry);

    setFormData({ ...formData, country: event.target.value });
  };

  console.log(myData._id);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `images/${myData._id}`);
    console.log(imageRef);
    const uploadTask = uploadBytes(imageRef, image);
    try {
      const snapshot = await uploadTask;
      const url = await getDownloadURL(imageRef);
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    if (image) {
      try {
        handleImageUpload().then((url) => {
          setImageUrl(url);
          console.log(url);
          dispatch(
            testerEditProfile({ ...formData, picturePath: url }, myData)
          );
          setIsActionCompleted(true);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(testerEditProfile(formData, myData));
      setIsActionCompleted(true);
      console.log(isActionCompleted);
    }
  };

  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <CustomIconButton
                aria-label="upload picture"
                component="label"
                sx={{ bgcolor: green[500] }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                <PhotoCamera sx={{ fill: "white" }} />
              </CustomIconButton>
            }
          >
            <CustomAvatar
              src={
                image
                  ? URL.createObjectURL(image)
                  : myData.picturePath
                  ? myData.picturePath
                  : ""
              }
            />
          </Badge>
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputLabel shrink={true}>Tester Name</InputLabel>

          <TextField
            required
            id="testerName"
            name="testerName"
            placeholder="Tester name"
            fullWidth
            autoComplete="given-name"
            defaultValue={myData.testerName}
            onChange={(e) =>
              setFormData({ ...formData, testerName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Email</InputLabel>

          <TextField
            required
            id="Email"
            name="Email"
            placeholder="Email"
            fullWidth
            autoComplete="email"
            defaultValue={myData.email}
            disabled
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Category</InputLabel>

          <TextField
            required
            id="category"
            name="category"
            placeholder="Category"
            fullWidth
            autoComplete="category"
            defaultValue="IT"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Choose your country</MenuItem>
            {countryList.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Date of Foundation</InputLabel>

          <TextField
            required
            fullWidth
            type="date"
            value={dateoffoundation}
            onChange={handleDateoffoundation}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Phone Number</InputLabel>

          <TextField
            required
            id="phone"
            name="phone"
            placeholder="+216"
            fullWidth
            autoComplete="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </Grid>

        {isSuccess && <AlertSuccess message={"Edited"} />}
        {isActionCompleted && <AlertContainer error={Error} />}

        <Grid item xs={12}>
          <Button variant="contained" size="large" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
}
