const apiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

if (!apiUrl) {
  throw new Error(
    "VITE_API_URL is missing. Configure it before building the frontend."
  );
}

export default apiUrl;
