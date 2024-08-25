# Take single input from user
user_input = input("Please enter your text: ")

# Analyze the input and generate report
result = Diagnose.get_analysis_with_recommendations(user_input)
report_dict = Diagnose.generate_report_dict(user_input, result['analysis'], result['recommendations'])

# Print the report dictionary
print(json.dumps(report_dict, indent=2))