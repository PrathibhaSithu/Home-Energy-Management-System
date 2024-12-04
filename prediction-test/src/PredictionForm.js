import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    "Flow Rate (L/min)": "",
    "Pressure (PSI)": "",
    "Water Level (%)": "",
    "Day of Week": "",
    "Action Taken_Maintenance Scheduled": 0,
    "Action Taken_Valve Closed": 0,
  });

  // State for API response
  const [predictionResult, setPredictionResult] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error making the prediction:", error);
      setPredictionResult({ error: "Failed to fetch prediction." });
    }
  };

  return (
    <div>
      <h1>Leak Detection Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Flow Rate (L/min):
          <input
            type="number"
            name="Flow Rate (L/min)"
            value={formData["Flow Rate (L/min)"]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Pressure (PSI):
          <input
            type="number"
            name="Pressure (PSI)"
            value={formData["Pressure (PSI)"]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Water Level (%):
          <input
            type="number"
            name="Water Level (%)"
            value={formData["Water Level (%)"]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Day of Week:
          <input
            type="number"
            name="Day of Week"
            value={formData["Day of Week"]}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Action Taken: Maintenance Scheduled:
          <input
            type="checkbox"
            name="Action Taken_Maintenance Scheduled"
            checked={formData["Action Taken_Maintenance Scheduled"] === 1}
            onChange={(e) =>
              setFormData({
                ...formData,
                "Action Taken_Maintenance Scheduled": e.target.checked ? 1 : 0,
              })
            }
          />
        </label>
        <br />
        <label>
          Action Taken: Valve Closed:
          <input
            type="checkbox"
            name="Action Taken_Valve Closed"
            checked={formData["Action Taken_Valve Closed"] === 1}
            onChange={(e) =>
              setFormData({
                ...formData,
                "Action Taken_Valve Closed": e.target.checked ? 1 : 0,
              })
            }
          />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>

      {predictionResult && (
        <div>
          <h2>Prediction Result</h2>
          {predictionResult.error ? (
            <p>{predictionResult.error}</p>
          ) : (
            <div>
              <p>Prediction: {predictionResult.prediction}</p>
              <p>Probability: {JSON.stringify(predictionResult.probability)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
