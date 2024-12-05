import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Container, Alert } from "@mui/material";

const PredictionForm = () => {
  const [features, setFeatures] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    const featuresArray = features.split(",").map((value) => parseFloat(value.trim()));

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: featuresArray,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Error making prediction. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Solar Energy Prediction
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          fullWidth
          label="Enter Features (comma-separated)"
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
            Prediction: <strong>{prediction[0]}</strong> Wh
          </Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default PredictionForm;
