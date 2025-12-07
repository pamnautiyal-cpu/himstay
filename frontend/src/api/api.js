import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// HOTELS
export const getHotels = () => API.get("/hotels");
export const searchHotels = (city) => API.get(`/hotels/search?city=${city}`);
export const getHotel = (id) => API.get(`/hotels/${id}`);

// BOOKINGS
export const createBooking = (data) => API.post("/bookings", data);
export const getUserBookings = (userId) => API.get(`/bookings/${userId}`);

export default API;
