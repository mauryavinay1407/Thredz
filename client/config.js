// config.js
export const BASE_URL = import.meta.env.DEV
  ? "http://localhost:4000"  // Local backend
  : ""; // Deployed backend