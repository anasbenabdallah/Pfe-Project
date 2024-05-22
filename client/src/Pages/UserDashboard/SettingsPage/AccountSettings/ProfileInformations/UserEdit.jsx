import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import {
  Avatar,
  Button,
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
import { userEditProfile } from "../../../../../redux/actions/userProfileAction";
import { green } from "@mui/material/colors";
import countries from "world-countries";
import {
  selectError,
  selectSuccess,
} from "../../../../../redux/reducers/userProfileReducer";
import AlertSuccess from "../../../../../Components/successalert";
import { useSelector } from "react-redux";
import AlertContainer from "../../../../../Components/alerts";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
}));
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserEdit = () => {
  const myData = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [dateofbirth, setDateOfBirth] = useState(() => {
    const date = new Date(myData.birthDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [selectedCountry, setSelectedCountry] = useState(myData.country || "");
  const [gender, setGender] = useState(myData.gender || "");
  const [phone, setPhone] = useState(myData.phoneNumber || "");
  const [isActionCompleted, setIsActionCompleted] = useState(false);

  const isSuccess = useSelector(selectSuccess);
  const Error = useSelector(selectError);

  console.log(isSuccess);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setFormData({ ...formData, gender: event.target.value });
  };
  const handleBirthDay = (event) => {
    setDateOfBirth(event.target.value);
    setFormData({ ...formData, birthDate: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setFormData({ ...formData, phoneNumber: event.target.value });
  };

  const countryList = countries.map((country) => country.name.common);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);

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
          dispatch(userEditProfile({ ...formData, picturePath: url }, myData));
          setIsActionCompleted(true);
          console.log(isActionCompleted);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(userEditProfile(formData, myData));
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
                sx={{ bgcolor: green[500], borderRadius: "50px" }}
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

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>FirstName</InputLabel>

          <TextField
            required
            id="firstName"
            name="firstName"
            placeholder="First name"
            fullWidth
            autoComplete="given-name"
            defaultValue={myData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Lastname</InputLabel>

          <TextField
            required
            id="lastName"
            name="lastName"
            placeholder="Last name"
            fullWidth
            autoComplete="family-name"
            defaultValue={myData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
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
            disabled
            autoComplete="email"
            defaultValue={myData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Country</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedCountry}
            onChange={handleCountryChange}
            fullWidth
            displayEmpty
            MenuProps={MenuProps}
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
          <InputLabel shrink={true}>Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={gender}
            onChange={handleGenderChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Choose your gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel shrink={true}>Date of Birth</InputLabel>

          <TextField
            required
            fullWidth
            type="date"
            value={dateofbirth}
            onChange={handleBirthDay}
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
};
export default UserEdit;
