// frontend/src/api/api.js
import axios from "axios";

// ✅ Yeh tumhare Render backend ka correct base URL hai
const API = axios.create({
  baseURL: "https://himstay.onrender.com/api",
});

// ✅ Agar user logged in hai to token header me add kar do
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        req.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
    }
  }
  return req;
});

// ===== AUTH APIs =====
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ===== HOTELS (baad me use karenge) =====
export const getHotels = () => API.get("/hotels");
export const getHotel = (id) => API.get(`/hotels/${id}`);

// ===== BOOKINGS (baad me use karenge) =====
export const createBooking = (data) => API.post("/bookings", data);
export const getUserBookings = () => API.get("/bookings/my");

export default API;
