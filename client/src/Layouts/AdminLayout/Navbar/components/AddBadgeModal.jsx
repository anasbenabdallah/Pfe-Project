// import { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   InputLabel,
//   TextField,
//   IconButton,
//   Paper,
//   Grid,
//   Typography,
//   Avatar,
//   Box,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import { useNavigate } from "react-router-dom";

// //redux
// import { useDispatch } from "react-redux";

// //firebase
// import storage from "../../../../../src/config/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export const AddBadgeModal = ({ open, handleClose }) => {
//   const myData = JSON.parse(localStorage.getItem("user")) ?? {};
//   const [badgeName, setBadgeName] = useState("");
//   const [badgeDescription, setBadgeDescription] = useState("");
//   const [badgeImg, setBadgeImg] = useState(null);
//   const [badgeImgUrl, setBadgeImgUrl] = useState(null);
//   const [badgeImgName, setBadgeImgName] = useState("");

//   const dispatch = useDispatch();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       if (badgeImg) {
//         const url = await handleImageUpload();
//         setBadgeImgUrl(url);
//         console.log(url);
//         dispatch(
//           addBadge({
//             badgeName,
//             badgeDescription,
//             badgeImg: url,
//           })
//         );
//         window.location.reload();
//         alert("Image uploaded successfully!");
//       } else {
//         dispatch(
//           addBadge({
//             badgeName,
//             badgeDescription,
//           })
//         );
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     handleClose();
//   };

//   const handleBadgeImageChange = ({ target: { files } }) => {
//     const [file] = files;
//     if (file) {
//       setBadgeImg(file);
//       setBadgeImgName(file.name);
//     }
//   };

//   const handleImageUpload = async () => {
//     const storageRef = ref(storage);
//     const timestamp = Date.now(); // generate a timestamp
//     const imageRef = ref(
//       storageRef,
//       `images/${myData.badgesEarned}-${timestamp}`
//     );
//     const uploadTask = uploadBytes(imageRef, badgeImg);
//     try {
//       const snapshot = await uploadTask;
//       const url = await getDownloadURL(imageRef);
//       return url;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       fullWidth
//       maxWidth="md"
//       onSubmit={handleSubmit}
//     >
//       <Grid container>
//         <Grid item xs={12} md={6}>
//           <DialogTitle variant="h5">Create a Badge</DialogTitle>
//           <Divider />
//           <Box elevation={0} sx={{ padding: "20px" }}>
//             <Stack alignItems={"center"} spacing={4}>
//               <Stack spacing={1} alignItems={"center"}>
//                 <Avatar
//                   sx={{ width: 150, height: 150 }}
//                   src={
//                     badgeImg
//                       ? URL.createObjectURL(badgeImg)
//                       : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//                   }
//                   id="badgeImgPreview"
//                 />
//                 <Typography color={"primary"}>{badgeImgName}</Typography>
//               </Stack>
//               <Button
//                 aria-label="upload picture"
//                 component="label"
//                 variant="contained"
//               >
//                 <input
//                   hidden
//                   accept="image/*"
//                   type="file"
//                   onChange={handleBadgeImageChange}
//                 />
//                 <Typography color={"white"}>Select a badge image</Typography>
//               </Button>
//             </Stack>
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Stack spacing={1}>
//             <DialogContent>
//               <Stack spacing={2}>
//                 <form onSubmit={""}>
//                   <InputLabel>Badge Title</InputLabel>
//                   <TextField
//                     name="title"
//                     onChange={(event) => setBadgeName(event.target.value)}
//                     margin="normal"
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="title"
//                     label="Title"
//                     autoFocus
//                   />
//                   <InputLabel>Badge Description</InputLabel>
//                   <TextField
//                     name="description"
//                     onChange={(event) =>
//                       setBadgeDescription(event.target.value)
//                     }
//                     margin="normal"
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="description"
//                     label="Description"
//                     multiline
//                     rows={8}
//                   />

//                   <Stack direction={"row"} justifyContent={"space-between"}>
//                     <Button variant="outlined" onClick={handleClose}>
//                       Cancel
//                     </Button>
//                     <Button variant="contained" type="submit">
//                       Create a Badge
//                     </Button>
//                   </Stack>
//                 </form>
//               </Stack>
//             </DialogContent>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Dialog>
//   );
// };
