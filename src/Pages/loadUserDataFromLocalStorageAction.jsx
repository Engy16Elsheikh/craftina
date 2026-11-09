import { saveUserData, saveUserToken } from "../stores/slice/user";

export const loadUserDataFromLocalStorage = () => {
  return (dispatch) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = localStorage.getItem("token");
      if (userData && token) {
        // Check token expiration
        const tokenExpiration = getTokenExpiration(token);
        if (tokenExpiration > Date.now()) {
          dispatch(saveUserData(userData));
          dispatch(saveUserToken(token));
        } else {
          // Clear expired token and user data
          localStorage.removeItem("userData");
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
  };
};

// Helper function to get token expiration time
const getTokenExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Token expiration time in milliseconds
    return payload.exp * 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};
