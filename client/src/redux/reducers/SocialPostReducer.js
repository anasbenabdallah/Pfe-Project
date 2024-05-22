const init = {
  posts: [],
};

const SocialPostReducer = (state = init, action) => {
  switch (action.type) {
    case "createPost":
      return {
        ...state,
        posts: action.payload,
      };

    case "getUserPosts":
      return {
        ...state,
        posts: action.payload,
      };

    case "getFeedPosts":
      return {
        ...state,
        posts: action.payload,
      };
    case "updatePostLikes":
      return {
        ...state,
        posts: state?.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "deletePost":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    default:
      return state;
  }
};

export default SocialPostReducer;
