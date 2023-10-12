import { useState } from "react";
import { useFetchData } from "../../hooks/axiosHooks";
import { ProductType } from "../../types/productTypes";
import ProductAddModal from "../Modal/ProductAddModal";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../reducers/productReducers/productInfoWithWeight";
import Button from "../Reusable Components/Button";
import {
  setCategoriesModal,
  setProdInfoModal,
  setProdsModal,
  setSearchModal,
} from "../../reducers/modalReducers/modalReducers";
import { RootState } from "../../types/reducersTypes";

const Product = ({ category_id }: { category_id: number }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetchData(
    ["allProductsByCategory", category_id],
    `/products/${category_id}`
  );
  const prodInfoModal = useSelector(
    (state: RootState) => state.modal.prodInfoModal
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`bg-white px-4 py-3 grid grid-cols-4 gap-4 flex-grow auto-rows-min`}
      >
        {data.map((product: ProductType, key: number) => (
          <div key={key}>
            <span
              onClick={() => {
                dispatch(setProduct(product));
                dispatch(setProdInfoModal(true));
              }}
              className=" h-16 flex items-center justify-center m-3 cursor-pointer"
              key={product.product_id}
            >
              {product.title}
            </span>
          </div>
        ))}
        {prodInfoModal === true ? <ProductAddModal /> : null}
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <Button
          size="default"
          onClick={() => {
            dispatch(setProdsModal(false));
            dispatch(setCategoriesModal(true));
          }}
        >
          Back
        </Button>
        <Button
          size="default"
          onClick={() => {
            dispatch(setProdsModal(false));
            dispatch(setSearchModal(true));
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default Product;
