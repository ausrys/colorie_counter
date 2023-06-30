import { useState } from "react";
import { MealType } from "../../types/enums";

type Props = {};
const MealTypeSelect = (props: any) => {
  return (
    <div>
      <label htmlFor="meal-type-select">Select a meal type:</label>
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
  );
};
export default MealTypeSelect;
