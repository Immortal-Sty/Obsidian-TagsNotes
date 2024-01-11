const snippetName = "状态栏自动隐藏_外部";
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
