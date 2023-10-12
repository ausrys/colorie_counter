import CurrentWeekStatistics from "../components/Statistics/CurrentWeekStatistics";
import { useState } from "react";
import Calendar from "react-calendar";
import "../components/Statistics/calendarStyles.css";
import Button from "../components/Reusable Components/Button";
import axios from "axios";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
const Statistics = () => {
  const now = new Date();
  const yesterdayBegin = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const [value, onChange] = useState<any>([yesterdayBegin, now]);
  const [fetchedData, setFetchedData] = useState(null);
  const submitHandler = async () => {
    if (value && (value[0] && value[1]) !== null) {
      try {
        const startDate = value[0].toISOString();
        const endDate = value[1].toISOString();
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/statistics/test?startDate=${startDate}&endDate=${endDate}`,
          { withCredentials: true }
        );
        setFetchedData(response.data);
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="h-full">
      <div>
        <h3>This week's calories</h3>
        <CurrentWeekStatistics />
      </div>
      <div>
        <h3>Choose different dates</h3>
        <div className="flex items-center flex-col">
          <Calendar
            onChange={(value) => onChange(value)}
            value={value}
            locale="en-GB"
            allowPartialRange={true}
            selectRange={true}
          />
          <Button onClick={submitHandler}> Submit</Button>
        </div>

        {fetchedData ? (
          <div className="h-80 flex justify-center">
            <VerticalBarChart
              labels={Object.keys(fetchedData)}
              datasets={Object.values(fetchedData)}
              title={`${value[0].toISOString()} -  ${value[1].toISOString()}`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Statistics;
