import { useMutation, useQuery} from "@tanstack/react-query"
import axios from "axios";
const rootAdress = "http://localhost:5000";

export const useFetchData = (queryKey : string , apiEndpoint: string) => {
    
  return useQuery([queryKey], async () => {
    const response = await axios.get(rootAdress.concat(apiEndpoint));
    return response.data;
  });
}
