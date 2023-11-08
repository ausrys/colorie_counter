import { MealType } from "./enums";
import { MealInfoType, ProductWithWeightType } from "./productTypes";

export type mealInfoData = MealInfoType & {
  createdAt: string;
  prodsInfo: ProductWithWeightType[];
  isPortion: boolean;
  title: string;
  meal_id: number;
};
export type TmealCreate = MealInfoType & {
  prods: ProductWithWeightType[];
  title: MealType;
  isPortion: 0 | 1;
  createdAt: Date;
  userTimezone: number;
};
