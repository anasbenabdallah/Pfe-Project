const init = {
  users: [],
  suggestedUsers: [],
  badges: [],
  friends: [],
  followings: [],
  userProfile: {},
  searchResults: [],
  userStats: [],
  error: null,
};

const UserReducer = (state = init, action) => {
  switch (action.type) {
    case "fetchUsers":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "getAllUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "getUserFriends":
      return {
        ...state,
        friends: action.payload,
      };
    case "getUserFollowings":
      return {
        ...state,
        followings: action.payload,
      };
    case "getsuggestedUsers":
      return {
        ...state,
        suggestedUsers: action.payload,
      };
    case "getUserById":
      return {
        ...state,
        userProfile: action.payload,
      };
    case "followUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "getBadgesEarnedByUser":
      return {
        ...state,
        badges: action.payload,
      };
    case "getUserStats":
      return {
        ...state,
        userStats: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
