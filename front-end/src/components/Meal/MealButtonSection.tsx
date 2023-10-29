import { useSelector } from "react-redux";
import { RootState } from "../../types/reducersTypes";
import Button from "../Reusable Components/Button";

type Props = {
  handleSaveMeal: () => void;
  setIsPortion: (val: 0 | 1) => void;
};
const MealButtonSection = (props: Props) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setIsPortion(Number(event.target.value) as 0 | 1);
  };
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  return (
    <section className="flex flex-col justify-start m-4 text-left box-border">
      {/* Save the meal only if there is atleast one product */}

      <div className="mb-4">
        <label className="text-lg font-semibold" htmlFor="isPortion-select">
          Select the portion of the meal:
        </label>
        <div className="flex items-center mt-2">
          <select
            className=" w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            typeof="number"
            id="isPortion-select"
            onChange={handleSelectChange}
          >
            <option value={1}>Full Portion</option>
            <option value={0}>Portion later</option>
          </select>
        </div>
        {mealProducts.length > 0 ? (
          <Button
            className="my-4 bg-blue-700"
            size={"lg"}
            onClick={() => props.handleSaveMeal()}
          >
            Save the meal
          </Button>
        ) : null}
      </div>
    </section>
  );
};
export default MealButtonSection;
