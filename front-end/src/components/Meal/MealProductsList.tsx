import { useDispatch, useSelector } from "react-redux";
import { MealProducts, ProductWithWeightType } from "../../types/productTypes";
import { deleteProductFromMeal } from "../../reducers/mealReducers/mealInfoReducer";
import Button from "../Reusable Components/Button";
import { RootState } from "../../types/reducersTypes";
import { setCategoriesModal } from "../../reducers/modalReducers/modalReducers";
type mealProdsListType = {
  title: string;
  isRemovable: boolean;
};
const MealProductsList = (props: mealProdsListType) => {
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  const dispatch = useDispatch();
  return (
    <>
      {props.isRemovable !== false ? (
        <Button size={"lg"} onClick={() => dispatch(setCategoriesModal(true))}>
          Add product
        </Button>
      ) : null}

      <h3 className="text-lg font-semibold text-left mb-2">{props.title}</h3>
      <div className="grid grid-cols-5 gap-x-4 mb-6">
        {mealProducts.length > 0
          ? mealProducts.map((mealproduct: ProductWithWeightType) => (
              <div
                key={mealproduct.product_id}
                className="flex flex-col my-3 bg-white border rounded-lg border-gray-300 shadow-md max-w-sm w-60"
              >
                <h3 className="text-xl font-bold my-2">{mealproduct.title}</h3>
                <div className="flex flex-col space-y-2 mx-4 mb-2">
                  <div className="flex items-center justify-between m-1">
                    <strong className="text-blue-600">Calories</strong>
                    <span className="text-gray-700">
                      {mealproduct.calories}
                    </span>
                  </div>
                  <div className="flex items-center justify-between m-1">
                    <strong className="text-blue-600">Protein</strong>
                    <span className="text-gray-700">{mealproduct.protein}</span>
                  </div>
                  <div className="flex items-center justify-between m-1">
                    <strong className="text-blue-600">Carbs</strong>
                    <span className="text-gray-700">{mealproduct.carbs}</span>
                  </div>
                  <div className="flex items-center justify-between m-1">
                    <strong className="text-blue-600">Weight</strong>
                    <span className="text-gray-700">{mealproduct.weight}</span>
                  </div>
                </div>

                {props.isRemovable === true ? (
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 w-4/5 mx-auto my-4"
                    size={"very_sm"}
                    animation={"pressAnimation"}
                    onClick={() => {
                      dispatch(deleteProductFromMeal(mealproduct));
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default MealProductsList;
