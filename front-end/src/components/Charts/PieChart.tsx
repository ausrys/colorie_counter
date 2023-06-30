import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

type PieProps = {
  labels: String[];
  label: String;
  pieData: number[];
};
const PieChart = (props: PieProps) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        data: props.pieData,
        backgroundColor: ["white", "rgb(54, 162, 235)", "rgb(255, 206, 86)"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
export default PieChart;
