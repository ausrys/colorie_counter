import { configureStore } from "@reduxjs/toolkit";
import mealInfoReducer from "./reducers/mealReducers/mealInfoReducer";
import productInfoSlice from "./reducers/productReducers/productInfoWithWeight";
import modalReducers from "./reducers/modalReducers/modalReducers";
import userReducer from "./reducers/userReducers/userReducer";
const store = configureStore({
  reducer: {
    mealInfo: mealInfoReducer,
    productInfo: productInfoSlice,
    modal: modalReducers,
    user: userReducer,
  },
});
export default store;
