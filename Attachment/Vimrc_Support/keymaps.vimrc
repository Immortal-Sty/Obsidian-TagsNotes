" 复制到系统剪贴板
vnoremap 'y \"+y
nnoremap 'y \"+y
nnoremap 'Y \"+Y

" ; 和 : 功能交换
noremap ; :
noremap : ;

" 切换保存触发的 ob 命令
exmap w obcommand quickadd:choice:875ccb15-29d6-46de-90d5-c63ee0d85bae

" 增加保存并关闭当前标签页的命令
exmap wq obcommand quickadd:choice:6c3fe175-e24b-40f0-a31e-d50dd36f7801

" 增加保存并关闭当前标签页的命令
exmap q obcommand workspace:close
