import axios from "axios";
import { useLoaderData } from "react-router-dom";
import VerticalBarChart from "../Charts/VerticalBarChart";
import PieChart from "../Charts/PieChart";
const rootAdress = "http://localhost:5000";
type Props = {};

const CurrentWeekStatistics = ({}: any) => {
  const data: any = useLoaderData();
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
  const currentDate = new Date().toISOString();
  const response = await axios.post(
    rootAdress.concat("/statistics/currentWeek"),
    {
      currentDate: currentDate,
    },
    { withCredentials: true }
  );
  return response.data;
};
