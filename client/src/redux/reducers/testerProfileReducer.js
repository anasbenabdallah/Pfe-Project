// EditProfileReducer.js
const init = {
  editedProfile: {},
  testerProfile: {},
  error: null,
  success: false,
};

export const selectSuccess = (state) => state.TesterProfile.success;
export const selectError = (state) => state.TesterProfile.error;

const EditProfileReducer = (state = init, action) => {
  switch (action.type) {
    case "tester_edit_profile_success":
      return {
        ...state,
        editedProfile: action.payload,
        error: null,
        success: true,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        success: false,
      };
    case "tester_edit_profile_error":
      return {
        ...state,
        error: action.payload,
      };
    case "getTesterById":
      return {
        ...state,
        testerProfile: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
