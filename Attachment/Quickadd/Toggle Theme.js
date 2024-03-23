module.exports = {
	entry: async (QuickAdd, settings, params) => {
		const snippetName = settings["主题名称"];
		// 更换主题
		if (app.customCss.theme !== snippetName) {
			app.customCss.setTheme(snippetName);
			new Notice(`切换为${snippetName}主题`);
		} else {
			app.customCss.setTheme("default");
			new Notice("切换为默认主题");

		}
		;
	}
	,
	settings: {
		name: "Toggle Theme",
		author: "PandaNocturne",
		options: {
			"主题名称": {
				type: "text",
				defaultValue: "Blue Topaz",
				placeholder: "主题的名称",
			},
		}
	},
};
