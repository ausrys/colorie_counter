import CurrentWeekStatistics from "../components/Statistics/CurrentWeekStatistics";
import { useState } from "react";
import Calendar from "react-calendar";
import "../components/Statistics/calendarStyles.css";
import Button from "../components/Reusable Components/Button";
import { useFetchData } from "../hooks/axiosHooks";
import axios from "axios";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
type Props = {};
const Statistics = (props: Props) => {
  const [value, onChange] = useState<Date>(new Date());
  const [fetchedData, setFetchedData] = useState(null);
  const submitHandler = async () => {
    if ((value[0] && value[1]) !== null) {
      const response = await axios.get(
        `http://localhost:5000/statistics/test?startDate=${value[0]}&endDate=${value[1]}`
      );
      setFetchedData(response.data);
    }
  };
  console.log(value);
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
            onChange={onChange}
            value={value}
            locale="en-GB"
            calendarType="ISO 8601"
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
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Statistics;
