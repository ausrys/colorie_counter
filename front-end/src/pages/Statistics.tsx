import CurrentWeekStatistics from "../components/Statistics/CurrentWeekStatistics";
import { useState } from "react";
import Calendar from "react-calendar";
import "../components/Statistics/calendarStyles.css";
import Button from "../components/Reusable Components/Button";
import axios from "axios";
import VerticalBarChart from "../components/Charts/VerticalBarChart";
import { dateFormatter } from "../helper/functions";
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
    <section className="mx-16">
      <div>
        <h3 className="text-3xl font-bold my-10">This week's statistics</h3>
        <CurrentWeekStatistics />
      </div>
      <h3 className="text-2xl font-bold my-8">Choose different dates</h3>

      <div className="flex flex-row justify-between">
        <div className="flex items-center flex-col mb-4">
          <Calendar
            className="w-4/5"
            onChange={(value) => onChange(value)}
            value={value}
            locale="en-GB"
            allowPartialRange={true}
            selectRange={true}
          />
          <Button className="my-3" onClick={submitHandler}>
            Submit
          </Button>
        </div>

        <div className="h-80 flex justify-center mb-5">
          {fetchedData ? (
            <VerticalBarChart
              labels={Object.keys(fetchedData)}
              datasets={Object.values(fetchedData)}
              title={
                value[0] && value[1] !== null
                  ? `${dateFormatter(value[0])} / ${dateFormatter(value[1])}`
                  : "Start Date - End Date"
              }
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default Statistics;
