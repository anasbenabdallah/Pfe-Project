/*a reducer is a pure function that takes an action 
and the previous state of the application and returns the new state.*/
const init = {
  userauth: [],
  role: "",
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("user"),
  success: false,
  RegisterSuccess: false,
  isFaceRecognition:
    JSON.parse(localStorage.getItem("user"))?.isFaceRecognition || false,
  error: null,
};

export const selectisAuthenticated = (state) => state.Auth.isAuthenticated;
export const selectError = (state) => state.Auth.error;
export const selectRole = (state) => state.Auth.role;
export const selectSuccess = (state) => state.Auth.success;
export const selectRegSuccess = (state) => state.Auth.RegisterSuccess;
export const selectisFaceRecog = (state) => state.Auth.isFaceRecognition;

const AuthReducer = (state = init, action) => {
  switch (action.type) {
    case "register_success":
      return {
        ...state,
        userauth: action.payload,
        RegisterSuccess: true,
        success: false,
        error: null,
      };
    case "login_success":
      return {
        ...state,
        userauth: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        role: action.payload.role,
        success: true,
        error: null,
      };
    case "forget_password_success":
      return {
        ...state,
        success: true,
        error: null,
      };
    case "reset_password_success":
      return {
        ...state,
        success: true,
        error: null,
      };
    case "verify_face_success":
      return {
        ...state,
        success: true,
        error: null,
      };
    case "add_face_success":
      return {
        ...state,
        success: true,
        isFaceRecognition: true,
        error: null,
      };
    case "logout_success":
      let newState = {
        ...state,
        userauth: [],
        token: "",
        isAuthenticated: false,
        role: "",
        success: true,
        error: null,
      };

      setTimeout(() => {
        newState = {
          ...newState,
          success: false,
        };
      }, 3000);

      return newState;
    case "register_error":
    case "login_error":
    case "forget_password_error":
    case "reset_password_error":
    case "logout_error":
    case "verify_face_error":
    case "add_face_error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
