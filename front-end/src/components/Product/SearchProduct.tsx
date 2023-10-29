import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/axiosHooks";
import { ProductType } from "../../types/productTypes";
import { setProduct } from "../../reducers/productReducers/productInfoWithWeight";
import ProductAddModal from "../Modal/ProductAddModal";
import { RootState } from "../../types/reducersTypes";
import {
  setProdInfoModal,
  setSearchInput,
  setSearchModal,
} from "../../reducers/modalReducers/modalReducers";
import Button from "../Reusable Components/Button";
const SearchProduct = () => {
  const isSearchModalOpen = useSelector(
    (state: RootState) => state.modal.searchModal
  );
  const searchInput = useSelector(
    (state: RootState) => state.modal.searchInput
  );

  const prodInfoModal = useSelector(
    (state: RootState) => state.modal.prodInfoModal
  );

  const dispatch = useDispatch();
  const { data, isFetched } = useFetchData(
    ["searchQuery", searchInput],
    `/products/search/${searchInput}`,
    1000 * 60 * 30,
    1000 * 60 * 30
  );
  function debounce(input: string, delay = 350) {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(setSearchInput(input));
    }, delay);
  }
  return (
    <>
      {isSearchModalOpen === true ? (
        <div className="my-8">
          <input
            type="text"
            placeholder="Search a product"
            onChange={(event) => {
              debounce(event.target.value);
            }}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      ) : null}
      <div className="bg-white px-6 py-3 flex-grow grid grid-cols-6 gap-4 auto-rows-min">
        {isFetched === true
          ? data.map((product: ProductType) => (
              <div
                key={product.product_id}
                className="h-16 flex items-center justify-center bg-gray-300/50 rounded-md cursor-pointer shadow-xl transform transition-transform hover:scale-105"
                onClick={() => {
                  dispatch(setProduct(product));
                  dispatch(setProdInfoModal(true));
                }}
              >
                <span className="text-blue-800 m-4 font-roboto font-medium text-lg">
                  {product.title}
                </span>
              </div>
            ))
          : null}
        {prodInfoModal === true ? <ProductAddModal /> : null}
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <Button
          size="default"
          onClick={() => {
            dispatch(setSearchModal(false));
            dispatch(setSearchInput(""));
          }}
        >
          Close
        </Button>
      </div>
    </>
  );
};
export default SearchProduct;
