
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const authService = {

  register: async (tz, fullName, password, grade) => {
    const response = await axios.post(API_URL + "register/teacher", {
      tz,
      fullName,
      password,
      grade,
    });
    return response.data;
  },


  login: async (tz, password) => {
    const response = await axios.post(API_URL + "login", {
      tz,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("user");
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export default authService;