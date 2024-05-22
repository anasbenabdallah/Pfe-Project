import axios from "axios";

export const getChallenges =
  (minAmount, maxAmount, searchQuery) => async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);

      let query = "";
      if (minAmount !== undefined && minAmount !== null) {
        query += `&min=${minAmount}`;
      }
      if (maxAmount !== undefined && maxAmount !== null) {
        query += `&max=${maxAmount}`;
      }
      if (searchQuery !== undefined && searchQuery !== null) {
        query += `&search=${searchQuery}`;
      }

      const { data } = await axios.get(
        `http://localhost:8000/challenge/challenges?${query}`,
        {
          withCredentials: true,
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_challenges_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenges error:", error.response.data);

      dispatch({
        type: "get_challenges_error",
        payload: error.response.data,
      });
    }
  };

export const getCompanyChallenges =
  (companyId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        ` http://localhost:8000/tester/get/${companyId}`,
        {
          withCredentials: true,
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_company_challenges_success",
        payload: data.challenges,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenges error:", error.response.data);

      dispatch({
        type: "get_company_challenges_error",
        payload: error.response.data,
      });
    }
  };

export const addChallenge = (challengeData) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    console.log("testtttt", challengeData);

    const { data } = await axios.post(
      "http://localhost:8000/challenge",
      challengeData,
      {
        withCredentials: true,
      }
    );
    console.log("data", data);

    dispatch({
      type: "add_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);
    console.log(error.response.data);

    dispatch({
      type: "add_challenge_error",
      payload: error.response.data,
    });
  }
};

export const deleteChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    console.log({ challengeId });
    const { data } = await axios.delete(
      `http://localhost:8000/challenge/deleteChallenge/${challengeId}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);

    dispatch({
      type: "delete_challenge_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);
    console.log(error.response.data);

    dispatch({
      type: "delete_challenge_error",
      payload: error.response.data,
    });
  }
};

export const joinChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    const myData = JSON.parse(localStorage.getItem("user"));
    const challengeData = { idChallenge: challengeId, idUser: myData._id };
    console.log(challengeData);

    const { data } = await axios.post(
      "http://localhost:8000/join",
      challengeData,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: "join_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "join_challenge_error",
      payload: error.response.data,
    });
  }
};

export const UnjoinChallenge = (challengeId) => async (dispatch, getState) => {
  try {
    const token = getState().Auth.token;
    const myData = JSON.parse(localStorage.getItem("user"));
    const challengeData = { idChallenge: challengeId, idUser: myData._id };
    console.log(challengeData);

    const { data } = await axios.post(
      "http://localhost:8000/unjoin",
      challengeData,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));

    dispatch({
      type: "unjoin_challenge_success",
      payload: data,
    });
    return data;
  } catch (error) {
    console.log("add user error:", error.response.data);

    dispatch({
      type: "unjoin_challenge_error",
      payload: error.response.data,
    });
  }
};

export const getChallengeUsers =
  (challengeId) => async (dispatch, getState) => {
    try {
      const token = getState().Auth.token;
      console.log(token);
      const challengeData = { idChallenge: challengeId };
      console.log(challengeData);

      const { data } = await axios.get(
        "http://localhost:8000/challenge/getChallengeUsers",
        {
          params: {
            idChallenge: challengeId,
          },
          withCredentials: true,
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_challenge_users_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenge users error:", error.response.data);

      dispatch({
        type: "get_challenge_users_error",
        payload: error.response.data,
      });
    }
  };

export const submitChallenge =
  (challengeData) => async (dispatch, getState) => {
    try {
      const myData = JSON.parse(localStorage.getItem("user"));
      console.log(challengeData);

      const { data } = await axios.post(
        "http://localhost:8000/challenge/submission",
        challengeData,
        {
          withCredentials: true,
        }
      );
      console.log("data:", data);
      dispatch({
        type: "submit_challenge_success",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenge users error:", error.response.data);

      dispatch({
        type: "submit_challenge_error",
        payload: error.response.data,
      });
    }
  };

export const getUserSubmitChallenge =
  (challengeId, userId) => async (dispatch, getState) => {
    try {
      console.log(userId);
      const { data } = await axios.get(
        "http://localhost:8000/challenge/getChallengeUserSubmit",
        {
          params: {
            challengeId: challengeId,
            userId: userId,
          },
          withCredentials: true,
        }
      );
      console.log("data:", data);
      dispatch({
        type: "get_user_submit_success",
        payload: data,
      });

      return data;
    } catch (error) {
      console.log("error:", error);
      console.log("get challenge users error:", error.response.data);

      dispatch({
        type: "get_user_submit_error",
        payload: error.response.data,
      });
    }
  };

export const getUserChallenges = (userId) => async (dispatch, getState) => {
  try {
    console.log(userId);
    const { data } = await axios.get("http://localhost:8000/user/challenges", {
      params: {
        userId: userId,
      },
      withCredentials: true,
    });
    console.log("data:", data);

    dispatch({
      type: "get_user_challenges_success",
      payload: data,
    });

    return data;
  } catch (error) {
    console.log("error:", error);
    console.log("get user challenges error:", error.response.data);

    dispatch({
      type: "get_user_challenges_error",
      payload: error.response.data,
    });
  }
};

export const chooseWinner = (challengeData) => async (dispatch, getState) => {
  try {
    const myData = JSON.parse(localStorage.getItem("user"));
    console.log(challengeData);

    const { data } = await axios.post(
      "http://localhost:8000/tester/challengeWinner",
      challengeData,
      {
        withCredentials: true,
      }
    );
    console.log("data:", data);
    dispatch({
      type: "winner_challenge_success",
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data.newCompany));
    return data.newChallenge;
  } catch (error) {
    console.log("error:", error);
    console.log("get challenge users error:", error.response.data);

    dispatch({
      type: "winner_challenge_error",
      payload: error.response.data,
    });
  }
};
