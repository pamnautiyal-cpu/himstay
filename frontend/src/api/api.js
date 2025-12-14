// frontend/src/api.js
import axios from "axios";

// 🔥 Correct Backend Base URL (NO /api at end)
const API = axios.create({
  baseURL: "https://himstay.onrender.com",
  withCredentials: false,
});

// 🔥 Login ke baad har request me token bhejne ke liye interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ------------------ AUTH ------------------
export const loginUser = (data) => API.post("/api/auth/login", data);
export const registerUser = (data) => API.post("/api/auth/register", data);

// ------------------ HOTELS ------------------
export const getHotels = () => API.get("/api/hotels");
export const getHotel = (id) => API.get(`/api/hotels/${id}`);

// ------------------ BOOKINGS ------------------
export const createBooking = (data) => API.post("/api/bookings", data);
export const getUserBookings = () => API.get("/api/bookings/my");

export default API;
