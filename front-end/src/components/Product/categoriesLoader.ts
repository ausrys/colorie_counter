import axios from "axios";
export const categoriesLoader = async () => {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL.concat("/categories/all"),
    { withCredentials: true }
  );
  return response.data;
};
