const BASE_URL = import.meta.env.VITE_API_URL || "https://hotel-booking-backend-api-nouk.onrender.com";
export const API_URL = BASE_URL.replace(/\/+$/, "");
export default API_URL;
