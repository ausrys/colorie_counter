import { useState } from "react";
import { useFetchData } from "../../hooks/axiosHooks";
import { ProductType } from "../../types/productTypes";
import ProductAddModal from "../Modal/ProductAddModal";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../reducers/productReducers/productInfoWithWeight";
import Button from "../Reusable Components/Button";
import {
  closeProdModal,
  openCatModal,
  openSearchModal,
} from "../../reducers/modalReducers/modalReducers";

const Product = (props: any) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetchData(
    ["allProductsByCategory", props.category_id],
    `/products/${props.category_id}`
  );
  const [prodInfoModal, setProdInfoModal] = useState(false);
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
                setProdInfoModal(true);
                dispatch(setProduct(product));
              }}
              className=" h-16 flex items-center justify-center m-3 cursor-pointer"
              key={product.product_id}
            >
              {product.title}
            </span>
          </div>
        ))}
        {prodInfoModal === true ? (
          <ProductAddModal
            prodInfoModal={prodInfoModal}
            setProdInfoModal={setProdInfoModal}
          />
        ) : null}
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <Button
          size="default"
          onClick={() => {
            dispatch(closeProdModal());
            dispatch(openCatModal());
          }}
        >
          Back
        </Button>
        <Button
          size="default"
          onClick={() => {
            dispatch(closeProdModal());
            dispatch(openSearchModal());
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default Product;
