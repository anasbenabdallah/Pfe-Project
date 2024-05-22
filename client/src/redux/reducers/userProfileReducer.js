// EditProfileReducer.js
const init = {
  editedProfile: {},
  success: false,
  error: null,
};

export const selectSuccess = (state) => state.userProfile.success;
export const selectError = (state) => state.userProfile.error;

const EditProfileReducer = (state = init, action) => {
  switch (action.type) {
    case "user_edit_profile_success":
      return {
        ...state,
        editedProfile: action.payload,
        success: true,
        error: null,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: false,
      };
    case "user_edit_profile_error":
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
