import axios from "axios";

// Create Post Action Creator
export const createPost = (myData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:8000/post/", myData, {
      withCredentials: true,
    });

    console.log(data);
    dispatch({
      type: "createPost",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Get Feed Posts Action Creator
export const getFeedPosts =
  (categories = "") =>
  async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);
      let url = "http://localhost:8000/post/posts";
      if (categories !== "") {
        url += `?categories=${categories}`;
      }
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      console.log("data:", data);
      dispatch({
        type: "getFeedPosts",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

// getUserPosts Action Creator
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/post/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getUserPosts",
      payload: response.data,
    });
    console.log("responseUser", response);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    if (!postId) {
      // check if postId is undefined
      throw new Error("Post ID is missing");
    }
    const response = await axios.delete(
      `http://localhost:8000/post/${postId}`,
      {
        headers: {
          userId: userId,
        },
        withCredentials: true,
      }
    );
    console.log("response", response);

    dispatch({
      type: "deletePost",
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};

// Like Post Action Creator
export const likePost = (postId) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const response = await axios.patch(
      `http://localhost:8000/post/${postId}/like`,
      {
        userId,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    console.log(postId);
    dispatch({
      type: "updatePostLikes",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
