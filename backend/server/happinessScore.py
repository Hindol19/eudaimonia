import joblib
import numpy as np


class Happiness:
    def loadModel():
        # Load the model and feature importances
        model_filename = "..\\models\\random_forest_model.pkl"
        rf_model = joblib.load(model_filename)

        # Get feature importances from the loaded model
        feature_importances = rf_model.feature_importances_

        # Feature names as per the original dataset
        feature_names = ['emotional_well_being', 'social_interactions',
                         'physical_health', 'stress_levels', 'life_satisfaction']

        return feature_importances, feature_names

    # Function to calculate happiness score from dictionary input

    def calculate_happiness_score(input_dict):
        feature_importances, feature_names = Happiness.loadModel()
        print("Input dictionary:", input_dict)
        # Ensure the input dictionary contains all required features
        if not all(feature in input_dict for feature in feature_names):
            raise ValueError(
                "Input dictionary is missing one or more required features.")

        # Extract values for features from the dictionary
        inputs = [input_dict[feature] for feature in feature_names]

        # Convert the inputs to a numpy array
        inputs_array = np.array(inputs)

        # Calculate the weighted average
        happiness_score = np.dot(inputs_array, feature_importances)

        return happiness_score


# Example input dictionary
# input_dict = {
#     'emotional_well_being': 4,
#     'social_interactions': 5,
#     'physical_health': 7,
#     'stress_levels': 8,
#     'life_satisfaction': 6
# }

# # Calculate and print the happiness score
# print("Input dictionary:", input_dict)
# happiness_score = Happiness.calculate_happiness_score(input_dict)
# print(f"The calculated happiness score is: {happiness_score:.2f}")
