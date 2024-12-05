import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components explicitly
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PredictionChart = ({ history }) => {
  const data = {
    labels: history.map((_, index) => `Prediction ${index + 1}`),
    datasets: [
      {
        label: "Prediction History",
        data: history,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0
      },
    },
  };

  return (
    <div style={{ marginTop: "20px", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PredictionChart;
