import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { MealType } from "../types/enums";
import { useSelector, useDispatch } from "react-redux";
import { resetMealInfo } from "../reducers/mealReducers/mealInfoReducer";
import ReusableModal from "../components/Modal/ReusableModal";
import FoodCategories from "../components/Product/FoodCategories";
import Product from "../components/Product/Product";
import {
  setCategoriesModal,
  setSearchModal,
} from "../reducers/modalReducers/modalReducers";
import MealProductsList from "../components/Meal/MealProductsList";
import MealInfo from "../components/Meal/MealInfo";
import Button from "../components/Reusable Components/Button";
import SearchProduct from "../components/Product/SearchProduct";
import MealTypeSelect from "../components/Meal/MealTypeSelect";
import { RootState } from "../types/reducersTypes";
import { useNavigate } from "react-router-dom";
import { TmealCreate } from "../types/mealTypes";

const MealCreate = () => {
  const [category_name, setCategory_name] = useState<string>("");
  const [category_id, setCategory_id] = useState<number | null>(null);
  const mealInfo = useSelector((state: RootState) => state.mealInfo.mealInfo);
  const [isPortion, setIsPortion] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  const { categoriesModal, productsModal, searchModal } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();
  // Get meal type
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealType(event.target.value as MealType);
  };
  const postMealWithProducts = useMutation({
    mutationFn: (fullMeal: TmealCreate) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/meals/meal/create`,
        fullMeal
      );
    },
    onSuccess: () => {
      navigate(`/meals`);
    },
  });
  useEffect(() => {
    dispatch(resetMealInfo());
  }, []);

  const handleSaveMeal = () => {
    const currentDate = new Date();

    postMealWithProducts.mutate({
      ...mealInfo,
      prods: mealProducts,
      title: selectedMealType,
      isPortion: isPortion,
      createdAt: currentDate,
    });
    setIsPortion(0);
    dispatch(resetMealInfo());
  };
  return (
    <div className="">
      <div className="flex flex-row items-center text-center">
        <h1 className="text-5xl font-bold my-10 ml-[44%]">
          {selectedMealType}
        </h1>
        {mealProducts.length > 0 ? (
          <Button
            className="ml-auto mr-16"
            size={"lg"}
            onClick={() => handleSaveMeal()}
          >
            Save the meal
          </Button>
        ) : null}
      </div>

      <MealTypeSelect
        selectedMealType={selectedMealType}
        handleSelectChange={handleSelectChange}
        isPortion={isPortion}
        setIsPortion={setIsPortion}
      />
      <div className="flex h-72">
        <MealInfo />
      </div>
      <MealProductsList isRemovable={true} title={"Added products:"} />
      <Button size={"lg"} onClick={() => dispatch(setCategoriesModal(true))}>
        Add product
      </Button>
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
          <div className="bg-gray-100 px-4 py-3">
            <Button
              size="default"
              onClick={() => {
                dispatch(setSearchModal(false));
              }}
            >
              Close
            </Button>
          </div>
        </ReusableModal>
      ) : null}
    </div>
  );
};

export default MealCreate;
