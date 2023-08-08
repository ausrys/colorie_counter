import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { backEndURL } from "../types/enums";
axios.defaults.withCredentials = true;
const rootAdress = backEndURL.url;

export const useFetchData = (
  queryKey: (string | number)[],
  apiEndpoint: string
) => {
  return useQuery(queryKey, async () => {
    const response = await axios.get(rootAdress.concat(apiEndpoint));
    return response.data;
  });
};
