import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductWithWeightType } from "../../types/productTypes";
import { MealInfoState } from "../../types/reducersTypes";
import { returnPrecisedNumber } from "../../helper/functions";

const initialState: MealInfoState = {
  mealProducts: [],
  mealInfo: {
    calories: 0,
    protein: 0,
    carbs: 0,
    weight: 0,
  },
  portion: 1,
};
const mealInfoReducer = createSlice({
  name: "mealInfo",
  initialState,
  reducers: {
    deleteProductFromMeal: (
      state,
      action: PayloadAction<ProductWithWeightType>
    ) => {
      const { calories, protein, carbs, weight } = action.payload;
      state.mealInfo.calories -= calories;
      state.mealInfo.protein -= protein;
      state.mealInfo.carbs -= carbs;
      state.mealInfo.weight -= weight;
      state.mealProducts = state.mealProducts.filter(
        (prod: ProductWithWeightType) =>
          prod.product_id !== action.payload.product_id
      );
    },
    addProductToMeal: (state, action: PayloadAction<ProductWithWeightType>) => {
      const { calories, protein, carbs, weight } = action.payload;
      state.mealInfo.calories += calories;
      state.mealInfo.protein += protein;
      state.mealInfo.carbs += carbs;
      state.mealInfo.weight += weight;
    },
    addProductToList: (state, action: PayloadAction<ProductWithWeightType>) => {
      const newObject = action.payload;
      const existingObj = state.mealProducts.find(
        (obj: ProductWithWeightType) => obj.product_id === newObject.product_id
      );
      if (existingObj) {
        state.mealProducts = state.mealProducts.filter(
          (prod: ProductWithWeightType) =>
            prod.product_id !== newObject.product_id
        );
        existingObj.calories += newObject.calories;
        existingObj.carbs += newObject.carbs;
        existingObj.protein += newObject.protein;
        existingObj.weight += newObject.weight;
        state.mealProducts = [...state.mealProducts, existingObj];
      } else state.mealProducts = [...state.mealProducts, newObject];
    },
    resetMealInfo: (state) => {
      state.mealInfo.calories = 0;
      state.mealInfo.carbs = 0;
      state.mealInfo.protein = 0;
      state.mealInfo.weight = 0;
      state.mealProducts = [];
      state.portion = 1;
    },
    setMealInfo: (state, action) => {
      if (action.payload) {
        const { calories, protein, carbs, weight, prodsInfo } = action.payload;
        state.mealInfo.calories = calories;
        state.mealInfo.carbs = carbs;
        state.mealInfo.protein = protein;
        state.mealInfo.weight = weight;
        state.mealProducts = prodsInfo;
      }
    },
    portionMealInfo: (state, action) => {
      state.portion = returnPrecisedNumber(
        Number(action.payload) / state.mealInfo.weight
      );
      const newPortionProdsArray = state.mealProducts.map(
        (prod: ProductWithWeightType) => {
          return {
            ...prod,
            calories: Number((prod.calories * state.portion).toFixed(2)),
            protein: Number((prod.protein * state.portion).toFixed(2)),
            carbs: Number((prod.carbs * state.portion).toFixed(2)),
            weight: Number((prod.weight * state.portion).toFixed(2)),
          };
        }
      );
      state.mealProducts = newPortionProdsArray;
      state.mealInfo.calories = Number(
        (state.mealInfo.calories * state.portion).toFixed(2)
      );
      state.mealInfo.protein = Number(
        (state.mealInfo.protein * state.portion).toFixed(2)
      );
      state.mealInfo.carbs = Number(
        (state.mealInfo.carbs * state.portion).toFixed(2)
      );
      state.mealInfo.weight = Number(
        (state.mealInfo.weight * state.portion).toFixed(2)
      );
    },
  },
});
export const {
  deleteProductFromMeal,
  addProductToMeal,
  addProductToList,
  resetMealInfo,
  setMealInfo,
  portionMealInfo,
} = mealInfoReducer.actions;
export default mealInfoReducer.reducer;
