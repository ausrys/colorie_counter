import { useSelector } from "react-redux";
import { MealInfoType } from "../../types/productTypes";
import MealTypeSelect from "./MealTypeSelect";
import { ReactNode } from "react";
import PieChart from "../Charts/PieChart";

type Props = {};

const MealInfo = (props: any) => {
  const mealInfo = props.mealInfo;
  const prodsInfoLength = props.prodsInfoLength;
  return (
    <div className=" flex flex-row text-center m-6 w-4/5 bg-indigo-100  border-0 rounded-md relative max-h-fit ">
      <div className="w-1/2 bg-indigo-200">
        <h3>Meal info: </h3>
        <div>
          {Object.entries(mealInfo).map(([key, value], mapkey) => {
            return (
              <h4 key={mapkey}>
                {key} : {Number((value as number).toFixed(2))}
              </h4>
            );
          })}
        </div>
      </div>
      {/* Pie chart */}
      <div className="relative h-full w-1/2 flex justify-center">
        <PieChart
          label="of grams"
          labels={Object.keys(mealInfo).filter((key) => key !== "weight")}
          pieData={
            prodsInfoLength > 0
              ? (Object.values(mealInfo).slice(0, -1) as number[])
              : [50, 50, 50]
          }
        />
      </div>
    </div>
  );
};

export default MealInfo;
