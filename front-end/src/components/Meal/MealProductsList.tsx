import { useDispatch, useSelector } from "react-redux";
import { MealProducts, ProductWithWeightType } from "../../types/productTypes";
import { deleteProductFromMeal } from "../../reducers/mealReducers/mealInfoReducer";
import Button from "../Reusable Components/Button";

const MealProductsList = (props: any) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h3>{props.title}</h3>
      <div className="flex flex-row h-48">
        {props.prodsInfo.length > 0
          ? props.prodsInfo.map((mealproduct: ProductWithWeightType) => (
              <div
                key={mealproduct.product_id}
                className="flex flex-col m-3 text-left border-2 rounded-md bg-stone-100 border-stone-200/50 h-fit"
              >
                {Object.entries(mealproduct).map(([key, value], mapkey) => {
                  if (key !== "product_id") {
                    return (
                      <span className="mx-3 my-1" key={mapkey}>
                        {key}: {value}
                      </span>
                    );
                  }
                })}
                {props.isListItemsRemovable === true ? (
                  <Button
                    className="bg-black"
                    size={"sm"}
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
