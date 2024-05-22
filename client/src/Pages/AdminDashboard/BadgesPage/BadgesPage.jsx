// import { useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import { Grid, Stack } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { getBadgeType } from "../../../../src/redux/actions/BadgeTypeAction";

// const BadgesPage = () => {
//   const dispatch = useDispatch();
//   const Badges = useSelector((state) => state.BadgeType.badges);

//   useEffect(() => {
//     dispatch(getBadgeType());
//   }, [dispatch]);

//   return (
//     <div>
//       <Grid container rowSpacing={2} columnSpacing={2}>
//         {Badges.map(
//           (badgeData) =>
//             badgeData && (
//               <Grid item key={badgeData._id} lg={3} md={6} xs={12}>
//                 <Card sx={{ height: 250 }}>
//                   <CardContent>
//                     <Stack spacing={2} alignItems={"center"}>
//                       <Avatar
//                         sx={{ width: 110, height: 110 }}
//                         src={badgeData.badgeImg}
//                       />
//                       <Typography variant="h5" noWrap color={"primary"}>
//                         {badgeData.badgeName}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" Wrap>
//                         {badgeData.badgeDescription}
//                       </Typography>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             )
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default BadgesPage;
