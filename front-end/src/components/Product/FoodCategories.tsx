import { useFetchData } from "../../hooks/axiosHooks";
import { useDispatch } from "react-redux";
import {
  closeCatModal,
  openProdModal,
  openSearchModal,
} from "../../reducers/modalReducers/modalReducers";
import Button from "../Reusable Components/Button";
type Props = {};
type FoodCategory = {
  category_name: string;
};

const FoodCategories = (props: any) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetchData(
    ["allCategories", "all"],
    "/categories/all"
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div
        className={`bg-white px-4 py-3 flex-grow grid grid-cols-4 gap-4 auto-rows-min`}
      >
        {data.map((category: any) => (
          <div
            className="h-20 flex items-center justify-center"
            key={category.food_category_id}
          >
            <span
              onClick={() => {
                dispatch(openProdModal());
                dispatch(closeCatModal());
                props.setCategory_id(category.food_category_id);
                props.setCategory_name(category.category_name);
              }}
              className="m-4 cursor-pointer"
            >
              {category.category_name}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 px-4 py-3">
        <Button
          size="default"
          onClick={() => {
            dispatch(closeCatModal());
          }}
        >
          Back
        </Button>
        <Button
          size="default"
          onClick={() => {
            dispatch(closeCatModal());
            dispatch(openSearchModal());
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
};
export default FoodCategories;
