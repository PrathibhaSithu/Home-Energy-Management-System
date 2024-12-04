from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the trained model
model_path = "../models/random_forest_model.pkl"
model = joblib.load(model_path)

# Required features
required_features = [
    "Flow Rate (L/min)",
    "Pressure (PSI)",
    "Water Level (%)",
    "Day of Week",
    "Action Taken_Maintenance Scheduled",
    "Action Taken_Valve Closed"
]

# Define API route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data from the POST request
    data = request.get_json()

    # Convert the input data into a DataFrame
    input_data = pd.DataFrame([data])

    # Add missing features with default values (0)
    for feature in required_features:
        if feature not in input_data.columns:
            input_data[feature] = 0

    # Reorder columns to match the model's expectations
    input_data = input_data[required_features]

    # Make a prediction
    prediction = model.predict(input_data)
    prediction_proba = model.predict_proba(input_data)

    # Return the result as a JSON response
    response = {
        "prediction": int(prediction[0]),
        "probability": prediction_proba[0].tolist()
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
