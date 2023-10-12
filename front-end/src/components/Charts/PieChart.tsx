import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

type PieProps = {
  labels: string[];
  label: string;
  pieData: number[];
};
const PieChart: React.FC<PieProps> = (props: PieProps) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        data: props.pieData,
        backgroundColor: ["#f1b963", "#ffd3b6", "#42b883"],
        borderColor: [
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
export default PieChart;
