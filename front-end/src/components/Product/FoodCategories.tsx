import { useFetchData } from "../../hooks/axiosHooks";
import { useDispatch } from "react-redux";
import Button from "../Reusable Components/Button";
import {
  setCategoriesModal,
  setProdInfoModal,
  setSearchModal,
} from "../../reducers/modalReducers/modalReducers";
type FoodCategoriesProps = {
  setCategory_id: (val: number) => void;
  setCategory_name: (val: string) => void;
};
type FoodCategory = {
  category_name: string;
  food_category_id: number;
};

const FoodCategories = (props: FoodCategoriesProps) => {
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
        {data.map((category: FoodCategory) => (
          <div
            className="h-20 flex items-center justify-center"
            key={category.food_category_id}
          >
            <span
              onClick={() => {
                dispatch(setCategoriesModal(false));
                dispatch(setProdInfoModal(true));
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
      <div className="bg-gray-100 px-4 py-3 flex flex-row justify-center">
        <div className="mx-2">
          <Button
            size="default"
            onClick={() => {
              dispatch(setCategoriesModal(false));
            }}
          >
            Back
          </Button>
        </div>
        <div className="mx-2">
          <Button
            size="default"
            onClick={() => {
              dispatch(setCategoriesModal(false));
              dispatch(setSearchModal(true));
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};
export default FoodCategories;
