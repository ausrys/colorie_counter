import { MealType } from "../../types/enums";

type TmealTypeSelect = {
  selectedMealType: string;
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
};
const MealTypeSelect = (props: TmealTypeSelect) => {
  return (
    <div className="max-w-[420px] w-auto text-left bg-white rounded-lg p-4 shadow-md">
      <label className="text-lg font-semibold" htmlFor="meal-type-select">
        Select the type of the meal you will be eating:
      </label>
      <div className="flex items-center mt-2">
        <select
          className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </div>
  );
};
export default MealTypeSelect;
