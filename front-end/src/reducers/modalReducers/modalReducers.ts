import { createSlice } from "@reduxjs/toolkit";

const modalReducers = createSlice({
  name: "modalReducers",
  initialState: {
    categoriesModal: false,
    productsModal: false,
    searchModal: false,
    searchInput: "",
  },
  reducers: {
    openProdModal: (state) => {
      state.productsModal = true;
    },
    closeProdModal: (state) => {
      state.productsModal = false;
    },
    openCatModal: (state) => {
      state.categoriesModal = true;
    },
    closeCatModal: (state) => {
      state.categoriesModal = false;
    },
    openSearchModal: (state) => {
      state.searchModal = true;
    },
    closeSearchModal: (state) => {
      state.searchModal = false;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const {
  openProdModal,
  closeProdModal,
  openCatModal,
  openSearchModal,
  closeCatModal,
  closeSearchModal,
  setSearchInput,
} = modalReducers.actions;
export default modalReducers.reducer;
