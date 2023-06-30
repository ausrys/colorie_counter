import clsx, { ClassValue } from "clsx";
import { ProductType } from "../types/productTypes";
import { twMerge } from "tailwind-merge";
export const returnEditedObject = (object: ProductType, weight: number) => {
  return {
    product_id: object.product_id,
    title: object.title,
    calories: Number((object.calories * (weight / 100)).toFixed(2)),
    protein: Number((object.protein * (weight / 100)).toFixed(2)),
    carbs: Number((object.carbs * (weight / 100)).toFixed(2)),
    weight: weight,
  };
};
export const returnPrecisedNumber = (number: number) =>
  Number(number.toFixed(2));
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
