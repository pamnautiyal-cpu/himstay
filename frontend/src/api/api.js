import axios from "axios";

const API = axios.create({
  baseURL: "https://himstay.onrender.com",
  withCredentials: false,
});

// Token attach
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
// FIXED (match backend)
export const createBooking = (data) => API.post("/api/bookings", data);
export const getBookings = () => API.get("/api/bookings");

export default API;