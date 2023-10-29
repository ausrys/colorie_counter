import { useFetchData } from "../../hooks/axiosHooks";
import { useDispatch } from "react-redux";
import Button from "../Reusable Components/Button";
import {
  setCategoriesModal,
  setProdsModal,
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
    "/categories/all",
    1000 * 60 * 30,
    1000 * 60 * 60
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <section className="h-full">
      <div className="bg-white rounded-lg p-4 h-full flex flex-col justify-between">
        <div className="flex-grow grid grid-cols-4 gap-4 auto-rows-min">
          {data.map((category: FoodCategory) => (
            <div
              className="h-20 flex items-center justify-center bg-indigo-100 rounded-md cursor-pointer"
              key={category.food_category_id}
              onClick={() => {
                dispatch(setCategoriesModal(false));
                dispatch(setProdsModal(true));
                props.setCategory_id(category.food_category_id);
                props.setCategory_name(category.category_name);
              }}
            >
              <span className="text-blue-800 m-4 font-roboto font-medium text-lg">
                {category.category_name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            size="default"
            type="button"
            onClick={() => {
              dispatch(setCategoriesModal(false));
            }}
            className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back
          </Button>
          <Button
            size="default"
            type="button"
            onClick={() => {
              dispatch(setCategoriesModal(false));
              dispatch(setSearchModal(true));
            }}
            className="bg-blue-500 hover-bg-blue-600 text-white"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};
export default FoodCategories;
