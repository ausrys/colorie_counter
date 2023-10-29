import axios from "axios";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
const rootAdress = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const mealInfoLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { meal_id } = params;

  const response = await axios.get(rootAdress.concat(`/meals/meal/${meal_id}`));
  return response.data;
};
export const mealsLoader: LoaderFunction = async () => {
  const response = await axios.get(rootAdress.concat("/meals"));
  return response.data;
};
export const adminChechLoader: LoaderFunction = async () => {
  const response = await axios.get(rootAdress.concat("/admin"));
  return response.data;
};
