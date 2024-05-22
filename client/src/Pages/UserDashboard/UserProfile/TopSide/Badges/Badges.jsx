// import { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
// import { makeStyles } from "@mui/styles";
// import {
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   ListItemAvatar,
//   Divider,
// } from "@mui/material";
// import TokenIcon from "@mui/icons-material/Token";
// import { useSelector, useDispatch } from "react-redux";
// import { getBadgesEarnedByUser } from "../../../../../redux/actions/UserAction";
// import { useParams } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   badges: {
//     width: 30,
//     height: 30,
//   },
//   badgesModal: {
//     width: 60,
//     height: 60,
//   },
// }));

// const Badges = () => {
//   const classes = useStyles();
//   const [openModal, setOpenModal] = useState(false);
//   const dispatch = useDispatch();
//   const id = useParams().userId;
//   const badges = useSelector((state) => state.User.badges);
//   useEffect(() => {
//     dispatch(getBadgesEarnedByUser(id)).catch(() =>
//       console.log("Error loading posts")
//     );
//   }, [dispatch, id]);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <Stack direction="row" spacing={2} alignItems={"flex-end"}>
//         {badges.map((badge, index) => (
//           <Avatar
//             key={badge._id}
//             className={classes.badges}
//             src={badge.badgeImg}
//           />
//         ))}
//         <Typography variant="h6" color={"gray"} onClick={handleOpenModal}>
//           All Badges
//         </Typography>
//         <Dialog open={openModal} onClose={handleCloseModal} fullWidth="lg">
//           <DialogTitle variant="h5">
//             <Stack flexDirection={"row"} columnGap={1} alignItems={"center"}>
//               <TokenIcon />
//               <Typography variant="h5"> All Badges</Typography>
//             </Stack>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Stack spacing={2}>
//               <Stack
//                 flexDirection={"row"}
//                 alignItems={"center"}
//                 columnGap={"1rem"}
//               >
//                 {badges.map((badge, index) => (
//                   <>
//                     <Avatar
//                       key={badge._id}
//                       className={classes.badgesModal}
//                       src={badge.badgeImg}
//                     />
//                     <Stack>
//                       <Typography variant="h5">{badge.badgeName}</Typography>
//                       <Typography>
//                         Description : {badge.badgeDescription}
//                       </Typography>
//                     </Stack>
//                   </>
//                 ))}
//               </Stack>
//             </Stack>
//           </DialogContent>
//         </Dialog>
//       </Stack>
//     </div>
//   );
// };

// export default Badges;
