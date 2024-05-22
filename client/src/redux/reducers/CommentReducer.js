const init = {
  comments: [],
  error: null,
};

const CommentReducer = (state = init, action) => {
  switch (action.type) {
    case "getComments":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
      };

    //This will add the new comment to the correct post in the comments object.

    case "addComment":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: [
            ...state.comments[action.payload.postId],
            action.payload.comment,
          ],
        },
      };

    default:
      return state;
  }
};

export default CommentReducer;
