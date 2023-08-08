import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.withCredentials = true;
const rootAdress = process.env.REACT_APP_BACKEND_URL as string;

export const useFetchData = (
  queryKey: (string | number)[],
  apiEndpoint: string
) => {
  return useQuery(queryKey, async () => {
    const response = await axios.get(rootAdress.concat(apiEndpoint));
    return response.data;
  });
};
