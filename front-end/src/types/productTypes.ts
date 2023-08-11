export type ProductType = {
  product_id: number;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
};
export type ProductWithWeightType = {
  product_id: number;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  weight: number;
};
export type MealInfoType = {
  calories: number;
  protein: number;
  carbs: number;
  weight: number;
};
export type MealProducts = {
  MealProducts: MealInfoType;
  title: string;
};
export type PortionProducts = {
  MealProducts: MealInfoType;
  title: string;
  product_id: number;
};
export type Category = {
  food_category_id: number;
  category_name: string;
};
