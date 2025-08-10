module.exports = async (params) => {
    const {
        quickAddApi: {
            inputPrompt,
            suggester
        },
        app,
        variables
    } = params;
    const {
        getPropertyValue
    } = this.app.plugins.plugins["metaedit"].api;

    variables["myNote"] = await inputPrompt("📕 Note Name");
    variables["myTime"] = window.moment().format("Y-MM-DDTHH:mm:ss");
    variables["myDate"] = window.moment().format("YMMDDHHmmssSSS");

    let first = true;
    let tagList = await getPropertyValue("tags", app.workspace.getActiveFile());
    if (tagList) {
        for (let i of tagList) {
            if (first) {
                variables["myTags"] = "  - " + i;
                first = false;
            } else {
                variables["myTags"] += "\n  - " + i;
            }
        }
    } else {
        allTags = await suggester(item => "🏷" + item, Object.keys(app.metadataCache.getTags()).map(x => x.replace("#", "")), "请输入标签：", true);
        variables["myTags"] = "  - " + allTags.replace("\n", "\n  - ");
    }
};
