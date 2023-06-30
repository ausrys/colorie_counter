import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MealProductsList from "../components/Meal/MealProductsList";
import { returnEditedObject, returnPrecisedNumber } from "../helper/functions";
import { useFetchData } from "../hooks/axiosHooks";
import { MealType } from "../types/enums";
import { MealInfoType, ProductWithWeightType } from "../types/productTypes";
import MealTypeSelect from "../components/Meal/MealTypeSelect";
import MealInfo from "../components/Meal/MealInfo";
import Button from "../components/Reusable Components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSearchModal,
  openCatModal,
} from "../reducers/modalReducers/modalReducers";
import ReusableModal from "../components/Modal/ReusableModal";
import FoodCategories from "../components/Product/FoodCategories";
import Product from "../components/Product/Product";
import SearchProduct from "../components/Product/SearchProduct";
import { setMealInfo } from "../reducers/mealReducers/mealInfoReducer";

type Props = {};

const Portion = (props: Props) => {
  const mealProducts = useSelector((state: any) => state.mealInfo.mealProducts);
  const mealInfo = useSelector((state: any) => state.mealInfo.mealInfo);
  const dispatch = useDispatch();
  const [selectedMealType, setSelectedMealType] = useState(MealType.Breakfast);
  const { categoriesModal, productsModal, searchModal } = useSelector(
    (state: any) => state.modal
  );
  const [category_name, setCategory_name] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const mealPortion = useRef<HTMLInputElement>(null);
  const [portion, setPortion] = useState(1);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (newMeal: any) => {
      return axios.post("http://localhost:5000/meals/meal/create", newMeal);
    },
    onSuccess: (data: any) => {
      navigate(`/meals`);
    },
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMealType(event.target.value as MealType);
  };
  const updateValuesWithPortion = () => {
    setPortion(
      returnPrecisedNumber(Number(mealPortion.current?.value) / mealInfo.weight)
    );
  };
  useEffect(() => {
    const newPortionProdsArray = mealProducts.map(
      (prod: ProductWithWeightType) => {
        return {
          ...prod,
          calories: Number((prod.calories * portion).toFixed(2)),
          protein: Number((prod.protein * portion).toFixed(2)),
          carbs: Number((prod.carbs * portion).toFixed(2)),
          weight: Number((prod.weight * portion).toFixed(2)),
        };
      }
    );

    const updatedMealValuesByPortion = {
      calories: Number((mealInfo.calories * portion).toFixed(2)),
      protein: Number((mealInfo.protein * portion).toFixed(2)),
      carbs: Number((mealInfo.carbs * portion).toFixed(2)),
      weight: Number((mealInfo.weight * portion).toFixed(2)),
    };

    dispatch(
      setMealInfo({
        ...updatedMealValuesByPortion,
        prodsInfo: newPortionProdsArray,
      })
    );
  }, [portion]);

  return (
    <div className="flex-1">
      {/* First section */}
      <div>
        <h2>Portion: {portion}</h2>
        <h2>{selectedMealType}</h2>
        <MealTypeSelect
          selectedMealType={selectedMealType}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <div className=" h-96 flex flex-row ">
        <MealInfo mealInfo={mealInfo} prodsInfoLength={mealProducts.length} />
        <div className="flex flex-col items-center m-4">
          {portion === 1 ? (
            <>
              <span style={{ textAlign: "left" }}>
                Set value of the portion
              </span>
              <input ref={mealPortion} type="number" name="" id="" />
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
      <MealProductsList
        title="Meal products"
        prodsInfo={mealProducts}
        isListItemsRemovable={true}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Portion meal */}
        <div style={{ width: "40%", margin: "auto" }}>
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
      </div>
      <div>{portion < 1 ? <div></div> : null}</div>
      {portion !== 1 ? (
        <div>
          <Button
            onClick={() =>
              mutation.mutate({
                ...mealInfo,
                prods: mealProducts,
                title: selectedMealType,
                isPortion: 1,
              })
            }
          >
            Save the meal
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Portion;
