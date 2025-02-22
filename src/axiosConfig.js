import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("balance");
      localStorage.removeItem("userData1");

      // Redirect to the home page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
