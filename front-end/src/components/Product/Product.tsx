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
    `/products/${category_id}`,
    1000 * 60 * 30,
    1000 * 60 * 60
  );
  const prodInfoModal = useSelector(
    (state: RootState) => state.modal.prodInfoModal
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="h-full">
      <div className="bg-white rounded-lg p-4 h-full flex flex-col justify-between">
        <div className="flex-grow grid grid-cols-4 gap-4 auto-rows-min">
          {data.map((product: ProductType) => (
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
          ))}
          {prodInfoModal === true ? <ProductAddModal /> : null}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            size="default"
            type="button"
            onClick={() => {
              dispatch(setProdsModal(false));
              dispatch(setCategoriesModal(true));
            }}
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back
          </Button>
          <Button
            size="default"
            type="button"
            onClick={() => {
              dispatch(setProdsModal(false));
              dispatch(setSearchModal(true));
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Product;
