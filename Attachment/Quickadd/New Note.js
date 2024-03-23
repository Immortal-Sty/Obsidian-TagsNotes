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
                params.variables["Tags"] = "  - " + i;
                first = false;
            } else {
                params.variables["Tags"] += "\n  - " + i;
            }
        }
    } else {
        params.variables["Tags"] = "  - <% tp.file.cursor(0) %>";
    }
    // params.variables["Tags"] = await getPropertyValue("tags", app.workspace.getActiveFile());
    params.variables["Note"] = await inputPrompt("📕 Note Name");
    params.variables["Time"] = window.moment().format("Y-MM-DDTHH:mm:ss");
    params.variables["Date"] = window.moment().format("YMMDDHHmmssSSS");
};
