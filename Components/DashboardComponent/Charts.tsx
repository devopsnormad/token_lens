import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

// Define the props type
interface BarChartProps {
  chartData: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

export const BarChart: React.FC<BarChartProps> = ({ chartData, options }) => {

  let date = new Date();
  let today = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;

  
  const modifiedChartData = {
    ...chartData,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      barThickness: 80, 
      borderRadius: 10, 
      backgroundColor: [
        'rgba(167, 110, 240, 1)',]
    }))
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "left", fontWeight: "bold", fontSize: "24px" }} className="text-primary-100">
        Bar Chart
      </h2>
      <Bar
        data={modifiedChartData} // Use the modified chart data
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
