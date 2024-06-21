const init = {
  users: [],
  testers: [],
  error: null,
};

export const selectUsers = (state) => state.Admin.users;
export const selectTesters = (state) => state.Admin.testers;

const AdminReducer = (state = init, action) => {
  switch (action.type) {
    case "add_user_success":
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    case "approve_tester_success":
      const updateTesters = state.testers.map((tester) =>
        tester._id === action.payload._id
          ? { ...tester, verified: true }
          : tester
      );
      return {
        ...state,
        testers: updateTesters,
        error: null,
      };

    case "add_user_error":
      return {
        ...state,
        error: action.payload,
      };

    case "delete_user_success":
      const updatedUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
        error: null,
      };

    case "delete_user_error":
      return {
        ...state,
        error: action.payload,
      };

    case "get_users_success":
      return {
        ...state,
        users: action.payload,
        error: null,
      };

    case "get_users_error":
      return {
        ...state,
        error: action.payload,
      };
    case "get_testers_success":
      return {
        ...state,
        testers: action.payload,
        error: null,
      };

    case "get_testers_error":
    case "approve_tester_error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AdminReducer;
