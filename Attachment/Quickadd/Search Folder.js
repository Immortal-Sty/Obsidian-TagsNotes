module.exports = async () => {
    const quickAddApi = app.plugins.plugins.quickadd.api;

    // 获取所有文件夹路径
    let folders = app.vault.getAllFolders();
    // 过滤掉根目录
    folders = folders.filter(folder => folder.path !== "/");

    const autoCollapse = true;

    // 准备用于显示的文件夹名称和对应的路径
    const folderPaths = folders.map(f => f.path);
    const folderNames = folders.map(f => {
        // 获取文件夹深度，用于显示缩进
        const depth = f.path.split('/').length - 1;
        const indent = '  '.repeat(depth);
        // 使用 📁 emoji 来表示文件夹
        return `${indent}📁 ${f.name} (${f.path})`;
    });

    // 使用 Quickadd 的 suggester 来创建选择器
    // quickAddApi.suggester 的第一个参数是显示的文本数组或函数，第二个参数是实际值的数组
    let selectedFolderPath = await quickAddApi.suggester(folderNames, folderPaths);

    // 如果用户取消了选择，则退出
    if (selectedFolderPath === null) return;

    // 获取选中的文件夹对象
    const selectedFolder = app.vault.getAbstractFileByPath(selectedFolderPath);

    // 如果找到了文件夹，则在 File Explorer 中聚焦它
    if (selectedFolder) {
        if (autoCollapse) {
            app.workspace.getLeavesOfType('file-explorer')[0].view.tree.setCollapseAll(true)
        }

        try {
            // 尝试使用内部 API 聚焦文件夹
            const fileExplorerLeaves = app.workspace.getLeavesOfType('file-explorer');
            // 检查是否存在可用叶子节点
            if (fileExplorerLeaves.length === 0) {
                // 若不存在，创建新的文件浏览器标签（参考源码逻辑）
                const leaf = app.workspace.getLeaf('tab');
                await leaf.setViewState({ type: 'file-explorer' });
                fileExplorerLeaves.push(leaf);
            }
            // 获取首个文件浏览器视图实例
            const fileExplorerView = fileExplorerLeaves[0].view;

            // 强制激活文件浏览器标签（确保视图可见）
            app.workspace.revealLeaf(fileExplorerLeaves[0]);

            const targetFile = app.vault.getAbstractFileByPath(selectedFolderPath);
            fileExplorerView.revealInFolder(targetFile);
        } catch (error) {
            // 如果上述方法都失败，显示一个通知
            new Notice( `无法在文件浏览器中聚焦文件夹：${selectedFolderPath}，请手动查找` );
        }

        // 显示一个通知，表明操作成功
        new Notice(`已选择文件夹: ${selectedFolderPath}`);
    } else {
        new Notice(`未找到文件夹: ${selectedFolderPath}`);
    }
};
