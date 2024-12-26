// src/redux/auth/authReducer.js
const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload, // payload now contains only serializable data (uid and email)
        error: null,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        error: null,
      };
    case "LOGIN_FAIL":
    case "LOGOUT_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
