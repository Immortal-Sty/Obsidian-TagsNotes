module.exports = {
	entry: async (QuickAdd, settings, params) => {
		const snippetName = settings["CSS 片段文件名"];
		const snippetPath = app.customCss.getSnippetPath(snippetName);
		if (!snippetPath) {
			new Notice(`Snippet ${snippetName} not found`);
		}

		const isSnippetsEnabled = app.customCss.enabledSnippets.has(snippetName)
		? true
		: false;

		if (isSnippetsEnabled) {
			console.log("关闭");
			app.customCss.setCssEnabledStatus(snippetName, false);
			app.customCss.requestLoadSnippets();
		} else {
			console.log("启动");
			app.customCss.setCssEnabledStatus(snippetName, true);
			app.customCss.requestLoadSnippets();
		}
	},
	settings: {
		name: "Toggle Snippets",
		author: "ImmortalSty",
		options: {
			"CSS 片段文件名": {
				type: "text",
				defaultValue: "",
				placeholder: "不要文件后缀，只要文件名",
			},
		}
	},
};
