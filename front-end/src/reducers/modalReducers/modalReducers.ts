import { createSlice, isAction } from "@reduxjs/toolkit";

const modalReducers = createSlice({
  name: "modalReducers",
  initialState: {
    categoriesModal: false,
    productsModal: false,
    searchModal: false,
    searchInput: "",
    prodInfoModal: false,
  },
  reducers: {
    setProdsModal: (state, action) => {
      state.productsModal = action.payload;
    },
    setCategoriesModal: (state, action) => {
      state.categoriesModal = action.payload;
    },
    setSearchModal: (state, action) => {
      state.searchModal = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setProdInfoModal: (state, action) => {
      state.prodInfoModal = action.payload;
    },
  },
});

export const {
  setProdsModal,
  setCategoriesModal,
  setSearchModal,
  setSearchInput,
  setProdInfoModal,
} = modalReducers.actions;
export default modalReducers.reducer;
