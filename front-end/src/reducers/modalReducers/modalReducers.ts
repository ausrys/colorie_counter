import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const modalInitialState = {
  categoriesModal: false,
  productsModal: false,
  searchModal: false,
  searchInput: "",
  prodInfoModal: false,
};
const modalReducers = createSlice({
  name: "modalReducers",
  initialState: modalInitialState,
  reducers: {
    setProdsModal: (state, action: PayloadAction<boolean>) => {
      state.productsModal = action.payload;
    },
    setCategoriesModal: (state, action: PayloadAction<boolean>) => {
      state.categoriesModal = action.payload;
    },
    setSearchModal: (state, action: PayloadAction<boolean>) => {
      state.searchModal = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setProdInfoModal: (state, action: PayloadAction<boolean>) => {
      state.prodInfoModal = action.payload;
    },
    closeAllModals: (state) => {
      state.categoriesModal = false;
      state.prodInfoModal = false;
      state.productsModal = false;
      state.searchModal = false;
      state.searchInput = "";
    },
  },
});

export const {
  setProdsModal,
  setCategoriesModal,
  setSearchModal,
  setSearchInput,
  setProdInfoModal,
  closeAllModals,
} = modalReducers.actions;
export default modalReducers.reducer;
