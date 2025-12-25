// src/components/charts/EmployeeChart.jsx
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function EmployeeChart() {
  return (
    <Bar
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Employees",
            data: [5, 8, 6, 9, 4],
            backgroundColor: "#2563eb",
          },
        ],
      }}
    />
  );
}
