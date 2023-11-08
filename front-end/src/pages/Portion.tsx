import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealProductsList from "../components/Meal/MealProductsList";
import { MealType } from "../types/enums";
import MealTypeSelect from "../components/Meal/MealTypeSelect";
import MealInfo from "../components/Meal/MealInfo";
import Button from "../components/Reusable Components/Button";
import { useDispatch, useSelector } from "react-redux";
import ReusableModal from "../components/Modal/ReusableModal";
import FoodCategories from "../components/Product/FoodCategories";
import Product from "../components/Product/Product";
import SearchProduct from "../components/Product/SearchProduct";
import { RootState } from "../types/reducersTypes";
import {
  portionMealInfo,
  resetMealInfo,
} from "../reducers/mealReducers/mealInfoReducer";
import { TmealCreate } from "../types/mealTypes";

const Portion = () => {
  const dispatch = useDispatch();
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  const mealInfo = useSelector((state: RootState) => state.mealInfo.mealInfo);
  const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
  const { categoriesModal, productsModal, searchModal } = useSelector(
    (state: RootState) => state.modal
  );
  const [category_name, setCategory_name] = useState<string>("");
  const [category_id, setCategory_id] = useState<number | null>(null);
  const mealPortion = useRef<HTMLInputElement>(null);
  const portion = useSelector((state: RootState) => state.mealInfo.portion);
  const navigate = useNavigate();
  const postPortionedMeal = useMutation({
    mutationFn: (newMeal: TmealCreate) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/meals/meal/create`,
        newMeal
      );
    },
    onSuccess: () => {
      navigate(`/meals`);
    },
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealType(event.target.value as MealType);
  };
  const updateValuesWithPortion = () => {
    dispatch(portionMealInfo(mealPortion.current?.value));
  };
  const handleSaveMeal = () => {
    const currentDate = new Date();
    const userTimezone = currentDate.getTimezoneOffset();
    postPortionedMeal.mutate({
      ...mealInfo,
      prods: mealProducts,
      title: selectedMealType,
      isPortion: 1,
      createdAt: currentDate,
      userTimezone: userTimezone,
    });
    dispatch(resetMealInfo());
  };
  return (
    <section className="mx-16">
      <h1 className="text-5xl font-bold my-10">{selectedMealType}</h1>
      <h3 className="text-xl text-right font-bold">
        Current meal portion: {portion * 100}%
      </h3>
      <MealTypeSelect
        selectedMealType={selectedMealType}
        handleSelectChange={handleSelectChange}
      />
      <div className=" my-3 flex flex-row ">
        <MealInfo />
        <div className="flex flex-col items-center m-4">
          {portion === 1 && mealProducts.length > 0 ? (
            <>
              <span className="text-lg font-semibold text-gray-700 mb-2">
                Set the weight of the portion:
              </span>
              <div className="flex flex-col items-center">
                <input
                  ref={mealPortion}
                  type="number"
                  name="portion"
                  id="portion"
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter portion value"
                />
                <Button
                  size="default"
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={updateValuesWithPortion}
                >
                  Set Portion
                </Button>
              </div>
            </>
          ) : (
            <>
              {mealProducts.length > 0 ? (
                <Button onClick={handleSaveMeal}>Save</Button>
              ) : null}
            </>
          )}
        </div>
      </div>
      <MealProductsList isRemovable={true} title={"Added products:"} />
      {categoriesModal === true ? (
        <ReusableModal modalTitle="Food Categories">
          <FoodCategories
            setCategory_name={setCategory_name}
            setCategory_id={setCategory_id}
          />
        </ReusableModal>
      ) : null}
      {productsModal === true ? (
        <ReusableModal modalTitle={category_name}>
          {category_id !== null ? <Product category_id={category_id} /> : null}
        </ReusableModal>
      ) : null}
      {searchModal === true ? (
        <ReusableModal modalTitle="Search">
          <SearchProduct />
        </ReusableModal>
      ) : null}
    </section>
  );
};

export default Portion;
