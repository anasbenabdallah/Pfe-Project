import axios from "axios";

export const getReviews = (userId) => async (dispatch) => {
  try {
    console.log(userId);
    const response = await axios.get(
      `http://localhost:8000/reviews/${userId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "get_Reviews_success",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: "get_Reviews_error",
      payload: error.response.data,
    });
  }
};

export const addReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/review/create`,
      review,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "add_Review_success",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
    dispatch({
      type: "add_Review_error",
      payload: error.response.data,
    });
  }
};
