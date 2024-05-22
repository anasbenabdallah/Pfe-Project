// EditProfileReducer.js
const init = {
  editedProfile: {},
  companyProfile: {},
  error: null,
  success: false,
};

export const selectSuccess = (state) => state.CompanyProfile.success;
export const selectError = (state) => state.CompanyProfile.error;

const EditProfileReducer = (state = init, action) => {
  switch (action.type) {
    case "company_edit_profile_success":
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
    case "company_edit_profile_error":
      return {
        ...state,
        error: action.payload,
      };
    case "getCompanyById":
      return {
        ...state,
        companyProfile: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
