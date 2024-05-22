const init = {
  conversations: [],
  error: null,
};

const ConversationReducer = (state = init, action) => {
  switch (action.type) {
    case "getConversations":
      return {
        ...state,
        conversations: action.payload,
      };

    case "send_message_success":
      return {
        ...state,
        conversations: action.payload,
      };
    default:
      return state;
  }
};

export default ConversationReducer;
