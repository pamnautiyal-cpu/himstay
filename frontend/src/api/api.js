import axios from "axios";

const API = axios.create({
  baseURL: "https://himstay.onrender.com/api",
});

// Add token if logged in
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

// ----------------------------
// AUTH
// ----------------------------
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ----------------------------
// HOTELS
// ----------------------------
export const getHotels = (filters) =>
  API.get("/hotels/filter", { params: filters });

export const getHotel = (id) =>
  API.get(`/hotels/${id}`);

// ----------------------------
// BOOKINGS
// ----------------------------
export const createBooking = (data) =>
  API.post("/bookings", data);

export const getUserBookings = () =>
  API.get("/bookings/my");

// ----------------------------
// ADMIN
// ----------------------------
export const addHotel = (data) =>
  API.post("/admin/add-hotel", data);

export const getAllBookings = () =>
  API.get("/admin/all-bookings");

export default API;
