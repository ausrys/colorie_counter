import { useSelector } from "react-redux";
import { MealType } from "../../types/enums";
import Button from "../Reusable Components/Button";
import { RootState } from "../../types/reducersTypes";

type TmealTypeSelect = {
  selectedMealType: string;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  isPortion?: number;
  setIsPortion?: (val: 0 | 1) => void;
};
const MealTypeSelect = (props: TmealTypeSelect) => {
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  return (
    <section className="flex justify-between">
      <div className="mx-16 ">
        <label className="text-lg" htmlFor="meal-type-select">
          Select the type of the meal you will be eating:
        </label>
        <select
          className="w-1/10 m-3"
          id="meal-type-select"
          value={props.selectedMealType}
          onChange={props.handleSelectChange}
        >
          {Object.keys(MealType).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Save the meal only if there is atleast one product */}
      {mealProducts.length > 0 && props.isPortion === 0 ? (
        <div className="mx-16 border-2 border-black p-3 rounded-3xl w-1/6 shadow-lg shadow-black/25">
          <>
            <h3 className="mb-2 whitespace-break-spaces">
              Set this meal to a full portion if you are going to eat it all
            </h3>
            <Button size={"lg"} onClick={() => props.setIsPortion?.(1)}>
              Full Portion
            </Button>
          </>
        </div>
      ) : null}
    </section>
  );
};
export default MealTypeSelect;
