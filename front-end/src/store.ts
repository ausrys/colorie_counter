import { configureStore } from "@reduxjs/toolkit";
import mealInfoReducer from "./reducers/mealReducers/mealInfoReducer";
import productInfoSlice from "./reducers/productReducers/productInfoWithWeight";
import modalReducers from "./reducers/modalReducers/modalReducers";
const store = configureStore({
  reducer: {
    mealInfo: mealInfoReducer,
    productInfo: productInfoSlice,
    modal: modalReducers,
  },
});
export default store;
