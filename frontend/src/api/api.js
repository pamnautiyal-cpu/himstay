import axios from "axios";

const API = axios.create({
  baseURL: "https://himstay.onrender.com/api",
  withCredentials: true,
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Hotels
export const getHotels = (params) => API.get("/hotels/filter", { params });
export const getHotel = (id) => API.get(`/hotels/${id}`);

// Bookings
export const getUserBookings = () => API.get("/bookings/my");
export const createBooking = (data) => API.post("/bookings", data);

export default API;
