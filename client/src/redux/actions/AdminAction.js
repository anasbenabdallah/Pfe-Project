import axios from "axios";

export const getUsers = () => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);

    const { data } = await axios.get("http://localhost:8000/admin/Users", {
      withCredentials: true,
    });
    console.log("data:", data);
    dispatch({
      type: "get_users_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("error:", error);
    console.log("get users error:", error.response.data);

    dispatch({
      type: "get_users_error",
      payload: error.response.data,
    });
  }
};

export const getCompanies = () => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(token);

    const { data } = await axios.get("http://localhost:8000/admin/Testers", {
      withCredentials: true,
    });
    console.log("data:", data);
    dispatch({
      type: "get_companies_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("error:", error);
    console.log("get testers error:", error.response.data);

    dispatch({
      type: "get_companies_error",
      payload: error.response.data,
    });
  }
};

export const addUser = (userData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/users",
      userData,
      config
    );

    dispatch({
      type: "add_user_success",
      payload: data,
    });
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "add_user_error",
      payload: error.response.data,
    });
  }
};

export const approveCompany = (companyId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log(companyId);

    const { data } = await axios.post(
      "http://localhost:8000/admin/appCompany",
      { companyId },
      {
        withCredentials: true,
      }
    );

    console.log("data:", data);
    dispatch({
      type: "approve_company_success",
      payload: data,
    });
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "approve_company_error",
      payload: error.response.data,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `http://localhost:8000/admin/delUsers/${userId}`,
      config
    );

    dispatch({
      type: "delete_user_success",
      payload: userId,
    });
  } catch (error) {
    console.log("delete user error:", error);

    dispatch({
      type: "delete_user_error",
    });
  }
};
