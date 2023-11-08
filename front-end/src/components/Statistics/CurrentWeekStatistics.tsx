import axios from "axios";
import { useLoaderData } from "react-router-dom";
import VerticalBarChart from "../Charts/VerticalBarChart";
import PieChart from "../Charts/PieChart";
import { currentWeeksStatistics } from "../../types/statisticsTypes";
const rootAdress = import.meta.env.VITE_BACKEND_URL;

const CurrentWeekStatistics = () => {
  const data = useLoaderData() as currentWeeksStatistics;
  return (
    <div className="flex flex-row">
      <div className="w-1/2 h-80 flex justify-center">
        <VerticalBarChart
          labels={Object.keys(data.CaloriesSumForEachWeekDay)}
          datasets={Object.values(data.CaloriesSumForEachWeekDay)}
          title="Current Week's calories"
        />
      </div>
      <div className="w-1/2 h-80 flex justify-center">
        {data.weekNutrition.calories !== 0 ? (
          <PieChart
            label="Total"
            labels={Object.keys(data.weekNutrition)}
            pieData={Object.values(data.weekNutrition)}
          />
        ) : null}
      </div>
    </div>
  );
};
export default CurrentWeekStatistics;
// Current Week's Statistics
export const CWSLoader = async () => {
  const currentDate = new Date();
  const userTimezone = currentDate.getTimezoneOffset();
  const response = await axios.post(
    rootAdress.concat("/statistics/currentWeek"),
    {
      currentDate,
      userTimezone,
    },
    { withCredentials: true }
  );
  return response.data;
};
