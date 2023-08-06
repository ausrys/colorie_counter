import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MealType } from "../types/enums";
import { useSelector, useDispatch } from "react-redux";
import { resetMealInfo } from "../reducers/mealReducers/mealInfoReducer";
import ReusableModal from "../components/Modal/ReusableModal";
import FoodCategories from "../components/Product/FoodCategories";
import Product from "../components/Product/Product";
import {
  closeSearchModal,
  openCatModal,
} from "../reducers/modalReducers/modalReducers";
import MealProductsList from "../components/Meal/MealProductsList";
import MealCreateButtonsSection from "../components/Meal/MealCreateButtonsSection";
import MealInfo from "../components/Meal/MealInfo";
import Button from "../components/Reusable Components/Button";
import SearchProduct from "../components/Product/SearchProduct";
import MealTypeSelect from "../components/Meal/MealTypeSelect";
import { RootState } from "../types/reducersTypes";

type Props = {};

const Meal = (props: Props) => {
  const [category_name, setCategory_name] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const mealInfo = useSelector((state: any) => state.mealInfo.mealInfo);
  const [isPortion, setIsPortion] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
  const mealProducts = useSelector((state: any) => state.mealInfo.mealProducts);
  const { categoriesModal, productsModal, searchModal } = useSelector(
    (state: any) => state.modal
  );
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  // Get meal type
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealType(event.target.value as MealType);
  };
  const postMealWithProducts = useMutation({
    mutationFn: (fullMeal: any) => {
      return axios.post("http://localhost:5000/meals/meal/create", fullMeal);
    },
  });
  const handleSaveMeal = () => {
    const currentDate = new Date();

    console.log(currentDate);
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
      <h1>{selectedMealType}</h1>
      <MealTypeSelect
        selectedMealType={selectedMealType}
        handleSelectChange={handleSelectChange}
      />
      <div className="flex h-72">
        <MealInfo mealInfo={mealInfo} prodsInfoLength={mealProducts.length} />
        {/* Buttons section */}
        <MealCreateButtonsSection
          isPortion={isPortion}
          setIsPortion={setIsPortion}
          handleSaveMeal={handleSaveMeal}
        />
      </div>
      <MealProductsList
        isListItemsRemovable={true}
        prodsInfo={mealProducts}
        title={"Added products"}
      />
      <Button size={"lg"} onClick={() => dispatch(openCatModal())}>
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
          <Product category_id={category_id} />
        </ReusableModal>
      ) : null}
      {searchModal === true ? (
        <ReusableModal modalTitle="Search">
          <SearchProduct />
          <div className="bg-gray-100 px-4 py-3">
            <Button
              size="default"
              onClick={() => {
                dispatch(closeSearchModal());
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

export default Meal;
