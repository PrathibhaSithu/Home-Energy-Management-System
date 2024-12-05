import React from "react";
import { Line } from "react-chartjs-2";

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
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
