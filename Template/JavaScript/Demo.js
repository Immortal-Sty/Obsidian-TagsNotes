const TEXT_FIELD = "Text field";

module.exports = {
	entry: async (QuickAdd, settings) => {
		// Logic here
		const textFieldSettingValue = settings[TEXT_FIELD];
	},
	settings: {
		name: "Demo",
		author: "Christian B. B. Houmann",
		options: {
			[TEXT_FIELD]: {
				type: "text",
				defaultValue: "",
					placeholder: "Placeholder",
					description: "Description here.",
			},
			"Checkbox": {
				type: "checkbox",
				defaultValue: false,
			},
			"Dropdown": {
				type: "dropdown",
				defaultValue: "Option 1",
					options: [
						"Option 1",
						"Option 2",
						"Option 3",
					],
			},
			"Format": {
				type: "format",
				defaultValue: "{{DATE:YYYY-MM-DD}}",
					placeholder: "Placeholder",
			},
		}
	},
};
