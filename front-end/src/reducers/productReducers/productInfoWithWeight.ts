import { createSlice} from '@reduxjs/toolkit';

const productInfoSlice = createSlice({
    name: "productInfo",
    initialState: {
        product_id : 0,
        title : '',
        calories: 0,
        protein: 0,
        carbs: 0,
    },
    reducers: {
        setProduct: (state, action) => {
            const { product_id, title, calories, protein, carbs } = action.payload;
            state.product_id = product_id;
            state.title = title;
            state.calories = calories;
            state.protein = protein;
            state.carbs = carbs;
    },
        clearProdInfo: (state) => {
            state.product_id = 0;
            state.title = "";
            state.calories = 0;
            state.protein = 0;
            state.carbs = 0;
        }
    }
})

export const {setProduct, clearProdInfo} = productInfoSlice.actions;
export default productInfoSlice.reducer;