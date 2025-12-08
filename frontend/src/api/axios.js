import axios from "axios";

const API = axios.create({
  baseURL: "https://himstay.onrender.com/api",
});

// Auth token add (if user logged in)
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
