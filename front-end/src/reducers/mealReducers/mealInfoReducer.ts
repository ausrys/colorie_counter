import { createSlice } from "@reduxjs/toolkit";
import { ProductWithWeightType } from "../../types/productTypes";

const mealInfoReducer = createSlice({
  name: "mealInfo",
  initialState: {
    mealProducts: [],
    mealInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      weight: 0,
    },
  },
  reducers: {
    deleteProductFromMeal: (state, action) => {
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
    addProductToMeal: (state, action) => {
      const { calories, protein, carbs, weight } = action.payload;
      state.mealInfo.calories += calories;
      state.mealInfo.protein += protein;
      state.mealInfo.carbs += carbs;
      state.mealInfo.weight += weight;
    },
    addProductToList: (state, action) => {
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
  },
});
export const {
  deleteProductFromMeal,
  addProductToMeal,
  addProductToList,
  resetMealInfo,
  setMealInfo,
} = mealInfoReducer.actions;
export default mealInfoReducer.reducer;
