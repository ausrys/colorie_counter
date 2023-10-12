import { useDispatch, useSelector } from "react-redux";
import PieChart from "../Charts/PieChart";
import React, { useEffect } from "react";
import { RootState } from "../../types/reducersTypes";
import { useLoaderData } from "react-router-dom";
import { setMealInfo } from "../../reducers/mealReducers/mealInfoReducer";
import { mealInfoData } from "../../types/mealTypes";
import { mealInfoLoader } from "../../helper/routesLoaders";
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
    <div className=" flex flex-row text-center m-6 w-3/5 relative max-h-fit mx-auto ">
      <div className="w-1/2 bg-indigo-200 mx-5 border-2 rounded-3xl border-cyan-950 flex flex-row items-center justify-center">
        <div className="">
          <h3 className="text-lg mb-2">Meal info: </h3>
          <div className=" flex flex-col text-left">
            {Object.entries(mealInfo).map(([key, value], mapkey) => (
              <React.Fragment key={mapkey}>
                <span className="flex ">
                  <h4 className="w-20">{key}</h4>
                  <h4>{Number((value as number).toFixed(2))}</h4>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Pie chart */}
      <div className="h-full w-1/2 flex justify-center mx-5">
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
    </div>
  );
};

export default MealInfo;
