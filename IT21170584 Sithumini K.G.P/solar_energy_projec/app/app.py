from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from tensorflow.keras.models import load_model
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the saved model
model = load_model('../models/solar_energy_model.keras')

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.get_json()
        input_features = np.array(data['features']).reshape(1, 1, -1)  # Reshape for LSTM

        # Make prediction
        prediction = model.predict(input_features)
        prediction_original = np.expm1(prediction).flatten()  # Reverse log transformation

        # Return the prediction
        return jsonify({'prediction': prediction_original.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
