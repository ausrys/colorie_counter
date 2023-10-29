import { useDispatch, useSelector } from "react-redux";
import PieChart from "../Charts/PieChart";
import { useEffect } from "react";
import { RootState } from "../../types/reducersTypes";
import { useLoaderData } from "react-router-dom";
import { setMealInfo } from "../../reducers/mealReducers/mealInfoReducer";
import { mealInfoData } from "../../types/mealTypes";
const MealInfo = () => {
  const data = useLoaderData() as mealInfoData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMealInfo(data));
  }, []);
  const mealInfo = useSelector((state: RootState) => state.mealInfo.mealInfo);
  const mealProducts = useSelector(
    (state: RootState) => state.mealInfo.mealProducts
  );
  return (
    <section className="flex flex-row my-6 h-80 w-4/5">
      <div className="w-2/5 mr-5 rounded-lg bg-white shadow-lg">
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-blue-800">
            Meal Information
          </h3>
          <div className="flex flex-col text-left mb-2">
            {Object.entries(mealInfo).map(([key, value], mapkey) => (
              <div
                className="flex items-center justify-between border-b border-gray-300 py-2"
                key={mapkey}
              >
                <strong className="text-gray-600">{key}</strong>
                <span className="text-blue-800 text-lg font-semibold">
                  {Number((value as number).toFixed(2))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pie chart */}
      <div className="rounded-lg bg-white shadow-lg h-full w-2/5 flex justify-center ml-14 ">
        <div className="m-4">
          <PieChart
            label="of grams"
            labels={Object.keys(mealInfo).filter((key) => key !== "weight")}
            pieData={
              mealProducts.length > 0
                ? (Object.values(mealInfo).slice(0, -1) as number[])
                : [50, 50, 50]
            }
          />
        </div>
      </div>
    </section>
  );
};

export default MealInfo;
