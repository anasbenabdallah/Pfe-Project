// import axios from "axios";

// export const getBadgeType = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8000/badgeType/badgeTypes",
//       {
//         withCredentials: true,
//       }
//     );
//     console.log("getBadgeType", response.data);
//     dispatch({
//       type: "getBadgeType",
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log("error:", error);
//   }
// };

// export const addBadge = (badgeData) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(
//       "http://localhost:8000/badgeType/add",
//       badgeData,
//       {
//         withCredentials: true,
//       }
//     );
//     console.log("addBadge", data);

//     dispatch({
//       type: "addBadge",
//       payload: data,
//     });
//     return data;
//   } catch (error) {
//     console.log("error:", error);
//   }
// };
