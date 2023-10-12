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
import {
  setCategoriesModal,
  setSearchModal,
} from "../reducers/modalReducers/modalReducers";
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

    postPortionedMeal.mutate({
      ...mealInfo,
      prods: mealProducts,
      title: selectedMealType,
      isPortion: 1,
      createdAt: currentDate,
    });
    dispatch(resetMealInfo());
  };
  return (
    <div className="flex-1">
      <div>
        <h2>Portion: {portion * 100}%</h2>
        <h2>{selectedMealType}</h2>
        <MealTypeSelect
          selectedMealType={selectedMealType}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <div className=" h-96 flex flex-row ">
        <MealInfo />
        <div className="flex flex-col items-center m-4">
          {portion === 1 ? (
            <>
              <span className="text-left mb-2">Set value of the portion</span>
              <input
                ref={mealPortion}
                type="number"
                name=""
                id=""
                className="mb-2 border border-black rounded-md"
              />
              <Button
                size={"default"}
                onClick={() => updateValuesWithPortion()}
              >
                Set portion
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <MealProductsList isRemovable={true} title={"Added products:"} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Portion meal */}
        <div style={{ width: "40%", margin: "auto" }}>
          <Button
            size={"lg"}
            onClick={() => dispatch(setCategoriesModal(true))}
          >
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
              {category_id !== null ? (
                <Product category_id={category_id} />
              ) : null}
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
      </div>
      <div>{portion < 1 ? <div></div> : null}</div>
      {portion !== 1 ? (
        <div>
          <Button onClick={() => handleSaveMeal()}>Save the meal</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Portion;
