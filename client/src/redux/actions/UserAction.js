import axios from "axios";

export const SearchUsers = (searchKeyword) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/users?search=${searchKeyword}`,
      {
        withCredentials: true,
      }
    );

    console.log("response", response.data);

    dispatch({
      type: "fetchUsers",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

export const getAllUsers = (myData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    const { data } = await axios.get("http://localhost:8000/allusers", {
      withCredentials: true,
    });
    console.log("data:", data);
    dispatch({
      type: "getAllUsers",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserFriends = (userId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/find/friends/${userId}`,
      {
        withCredentials: true,
      }
    );
    const friends = response.data.filter(
      (friend) => friend !== null && friend !== undefined
    );
    console.log("friends", friends);
    console.log("friends", response);
    dispatch({
      type: "getUserFriends",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserFollowings = (userId) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/find/followings/${userId}`,
      {
        withCredentials: true,
      }
    );
    const followings = response.data.filter(
      (following) => following !== null && following !== undefined
    );
    console.log("followings", followings);

    dispatch({
      type: "getUserFollowings",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getsuggestedUsers = (myData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    const { data } = await axios.get(
      "http://localhost:8000/find/suggestedUsers",
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getsuggestedUsers",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:8000/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getUserById",
      payload: response.data,
    });
    console.log("User:", response.data);
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (otheruserId) => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const response = await axios.put(
      `http://localhost:8000/toggleFollow/${otheruserId}`,
      {
        userId,
      },
      { withCredentials: true }
    );
    console.log(response);
    console.log("ddddd", otheruserId);
    console.log("toggle", userId);

    dispatch({
      type: "followUser",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserStats = (myData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);
    const { data } = await axios.get("http://localhost:8000/users/stats", {
      withCredentials: true,
    });
    console.log("data:", data);
    dispatch({
      type: "getUserStats",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
