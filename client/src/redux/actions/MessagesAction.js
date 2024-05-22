import axios from "axios";

export const getMessages = (conversationId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/messages/${conversationId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getMessages",
      payload: response.data,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

export const CreateMessage =
  (conversationId, message, sender) => async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/messages/`,
        { conversationId, message, sender },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "CreateMessage",
        payload: response.data,
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
