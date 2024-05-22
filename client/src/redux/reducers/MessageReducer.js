const init = {
  messages: [],
  error: null,
};

const MessageReducer = (state = init, action) => {
  switch (action.type) {
    case "getMessages":
      return {
        ...state,
        messages: action.payload,
      };

    case "CreateMessage":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default MessageReducer;
