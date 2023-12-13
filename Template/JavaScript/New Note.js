module.exports = async (params) => {
    const {
        quickAddApi: { inputPrompt },
        app
    } = params;
    const {
        getPropertyValue
    } = this.app.plugins.plugins["metaedit"].api;

    params.variables["Tags"] = await getPropertyValue("tags", app.workspace.getActiveFile());
    params.variables["Note"] = await inputPrompt("📕 Note Name");
    params.variables["Time"] = window.moment().format("Y-MM-DDTHH:mm:ss");
    params.variables["Date"] = window.moment().format("YMMDDHHmmssSSS");
};
