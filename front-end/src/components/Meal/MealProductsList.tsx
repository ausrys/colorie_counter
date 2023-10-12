import { useDispatch, useSelector } from "react-redux";
import { MealProducts, ProductWithWeightType } from "../../types/productTypes";
import { deleteProductFromMeal } from "../../reducers/mealReducers/mealInfoReducer";
import Button from "../Reusable Components/Button";
import { RootState } from "../../types/reducersTypes";
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
    <div>
      <h3 className="text-lg text-left ml-16">{props.title}</h3>
      <div className="flex flex-row h-48  mx-16">
        {mealProducts.length > 0
          ? mealProducts.map((mealproduct: ProductWithWeightType) => (
              <div
                key={mealproduct.product_id}
                className="flex flex-col m-3 text-left border-2 rounded-md bg-stone-200 border-stone-200/50 h-fit"
              >
                {Object.entries(mealproduct).map(([key, value], mapkey) => {
                  if (key !== "product_id") {
                    return (
                      <span className="mx-3 my-1 leading-none " key={mapkey}>
                        {key}: {value}
                      </span>
                    );
                  }
                })}
                {props.isRemovable === true ? (
                  <Button
                    className="bg-black"
                    size={"very_sm"}
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
    </div>
  );
};

export default MealProductsList;
