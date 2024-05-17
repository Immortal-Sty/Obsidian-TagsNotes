module.exports = async (params) => {
    const {
        quickAddApi: { inputPrompt },
        app
    } = params;
    const {
        getPropertyValue
    } = this.app.plugins.plugins["metaedit"].api;

    let first = true;
    let tagList = await getPropertyValue("tags", app.workspace.getActiveFile());
    if (tagList) {
        for (let i of tagList) {
            if (first) {
                params.variables["myTags"] = "  - " + i;
                first = false;
            } else {
                params.variables["myTags"] += "\n  - " + i;
            }
        }
    } else {
        params.variables["myTags"] = "  - <% tp.file.cursor(0) %>";
    }
    // params.variables["Tags"] = await getPropertyValue("tags", app.workspace.getActiveFile());
    params.variables["myNote"] = await inputPrompt("📕 Note Name");
    params.variables["myTime"] = window.moment().format("Y-MM-DDTHH:mm:ss");
    params.variables["myDate"] = window.moment().format("YMMDDHHmmssSSS");
};
