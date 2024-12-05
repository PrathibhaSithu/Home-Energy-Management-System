import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import PredictionForm from "./PredictionForm";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Solar Energy Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px" }}>
            <PredictionForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Prediction Trends
            </Typography>
            {/* Add your PredictionChart component here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
