" 回到上次更改的地方
nnoremap g; u<C-r>

" ===========
" === 标题 ===
" ===========

" 上一个标题
exmap prevHeading jsfile Attachment/Vimrc_Support/vimrc.js {jumpHeading(false)}
nnoremap [[ :prevHeading<CR>

" 下一个标题
exmap nextHeading jsfile Attachment/Vimrc_Support/vimrc.js {jumpHeading(true)}
nnoremap ]] :nextHeading<CR>

" ===========
" === 链接 ===
" ===========

" 上一个链接
exmap prevLink jsfile Attachment/Vimrc_Support/vimrc.js {jumpNextLink(false)}
nunmap ,
nmap ,, :prevLink

" 下一个链接
exmap nextLink jsfile Attachment/Vimrc_Support/vimrc.js {jumpNextLink(true)}
nunmap .
nmap .. :nextLink

" 打开链接在当前页面
exmap openlink obcommand editor:follow-link
nnoremap go :openlink

" 打开链接在新窗口中
exmap openlink_windows obcommand editor:open-link-in-new-window
nnoremap gw :openlink_windows

" =============
" === 标签页 ===
" =============

" 选择标签页跳转
"exmap tabSeletor obcommand tab-selector:open-tab-selector
"nnoremap <Tab> :tabSeletor
