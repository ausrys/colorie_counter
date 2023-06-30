import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Reusable Components/Button";
import { closeSearchModal } from "../../reducers/modalReducers/modalReducers";
import { useFetchData } from "../../hooks/axiosHooks";
import { ProductType } from "../../types/productTypes";
import { setProduct } from "../../reducers/productReducers/productInfoWithWeight";
const rootAdress = "http://localhost:5000";
type Props = {};
const SearchProduct = (props: Props) => {
  const searchInput = useSelector((state: any) => state.modal.searchInput);

  const [searchQueryResults, setSearchQueryResults] = useState([]);
  const dispatch = useDispatch();
  const [prodInfoModal, setProdInfoModal] = useState(false);
  const { data, isLoading, error, isFetched } = useFetchData(
    ["searchQuery", searchInput],
    `/products/search/${searchInput}`
  );
  return (
    <>
      <div
        className={`bg-white px-4 py-3 flex-grow grid grid-cols-4 gap-4 auto-rows-min`}
      >
        {/* Search Bar */}

        {isFetched === true
          ? data.map((product: ProductType, key: number) => (
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
            ))
          : null}
      </div>
    </>
  );
};
export default SearchProduct;
