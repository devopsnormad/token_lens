import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

// Define the props type
interface BarChartProps {
  chartData: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

export const BarChart: React.FC<BarChartProps> = ({ chartData, options }) => {

    let date = new Date();
    let today = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={options || {
          plugins: {
            title: {
              display: true,
              text: `Transactions Today: ${today}`,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
