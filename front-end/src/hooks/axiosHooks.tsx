import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.withCredentials = true;
const rootAdress = import.meta.env.VITE_BACKEND_URL;
export const useFetchData = (
  queryKey: (string | number)[],
  apiEndpoint: string,
  cacheTime: number,
  staleTime: number
) => {
  return useQuery(
    queryKey,
    async () => {
      const response = await axios.get(rootAdress.concat(apiEndpoint));
      return response.data;
    },
    {
      staleTime: staleTime,
      cacheTime: cacheTime,
    }
  );
};
