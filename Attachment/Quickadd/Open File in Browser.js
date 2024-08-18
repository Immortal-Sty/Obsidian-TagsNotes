const filePath = app.workspace.getActiveFile().path;
const hs = app.plugins.getPlugin("html-server");
if (!hs) {
	console.log("🟠未能找到 HTML Server 插件");
} else {
	const port = hs.settings.port;
	let url = `http://127.0.0.1:${port}/${filePath}`;
	new Notice("Open 🌐" + url);
	window.open(url, '_blank');
}
