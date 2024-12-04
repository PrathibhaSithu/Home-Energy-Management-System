import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components for UI
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
  font-family: Arial, sans-serif;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  margin: 10px 0;
  display: block;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #e8f5e9;
  border-radius: 10px;
  border: 1px solid #c8e6c9;
  color: #2e7d32;
  text-align: center;
`;

const ErrorContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #ffebee;
  border-radius: 10px;
  border: 1px solid #ef9a9a;
  color: #c62828;
  text-align: center;
`;

const StyledPredictionForm = () => {
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
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPredictionResult(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPredictionResult(response.data);
    } catch (err) {
      console.error("Error making the prediction:", err);
      setError("Failed to fetch prediction. Please try again.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Leak Detection Predictor</Title>

        <Input
          type="number"
          name="Flow Rate (L/min)"
          placeholder="Flow Rate (L/min)"
          value={formData["Flow Rate (L/min)"]}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="Pressure (PSI)"
          placeholder="Pressure (PSI)"
          value={formData["Pressure (PSI)"]}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="Water Level (%)"
          placeholder="Water Level (%)"
          value={formData["Water Level (%)"]}
          onChange={handleInputChange}
          required
        />
        <Input
          type="number"
          name="Day of Week"
          placeholder="Day of Week (0=Sunday, 1=Monday...)"
          value={formData["Day of Week"]}
          onChange={handleInputChange}
          required
        />
        <CheckboxLabel>
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
          Maintenance Scheduled
        </CheckboxLabel>
        <CheckboxLabel>
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
          Valve Closed
        </CheckboxLabel>

        <Button type="submit">Predict</Button>
      </Form>

      {predictionResult && (
        <ResultContainer>
          <h2>Prediction Result</h2>
          <p>Prediction: {predictionResult.prediction === 0 ? "No Leak" : "Leak Detected"}</p>
          <p>Probability: {JSON.stringify(predictionResult.probability)}</p>
        </ResultContainer>
      )}

      {error && <ErrorContainer>{error}</ErrorContainer>}
    </Container>
  );
};

export default StyledPredictionForm;
