import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import axios from "axios";

const PredictionForm = () => {
  const [features, setFeatures] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    const featuresArray = features.split(",").map((value) => parseFloat(value.trim()));

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: featuresArray,
      });
      const newPrediction = response.data.prediction[0];
      setPrediction(newPrediction);
      setHistory((prev) => [...prev, newPrediction]);
    } catch (err) {
      setError("Error making prediction. Please try again.");
    }
  };

  const chartData = {
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

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Solar Energy Prediction
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Input Features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="e.g., 0.32, 0.75, 0.62, 0.91, 0.45, 0.50, 0.60"
          style={{ marginBottom: "20px" }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Predict
        </Button>
      </Box>
      <Box mt={4}>
        {prediction && (
          <Alert severity="success">
            Prediction: <strong>{prediction} Wh</strong>
          </Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      {history.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom align="center">
            Prediction History
          </Typography>
          <Line data={chartData} />
        </Box>
      )}
    </Container>
  );
};

export default PredictionForm;
