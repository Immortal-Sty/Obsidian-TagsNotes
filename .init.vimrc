" =================
" === Vim Quick ===
" =================

" 复制到系统剪贴板
vnoremap 'y \"+y
nnoremap 'Y \"+Y
" 改为 ; 触发命令模式，代替 :
noremap ; :

" ==========
" === Go ===
" ==========

" 打开链接在当前页面
exmap openlink obcommand editor:follow-link
nnoremap go :openlink
" 打开链接在新窗口中
exmap openlink_windows obcommand editor:open-link-in-new-window
nnoremap gw :openlink_windows
" 回到上次更改的地方
nnoremap g; u<C-r>
" 下一个标题
exmap nextHeading jsfile .vimrc.js {jumpHeading(true)}
nnoremap ]] :nextHeading
" 上一个标题
exmap prevHeading jsfile .vimrc.js {jumpHeading(false)}
nnoremap [[ :prevHeading

" =============
" === Table ===
" =============

" 插入表格
exmap new_table obcommand editor:insert-table
nnoremap tt :new_table
" 删除当前列
exmap table_delete_column obcommand editor:table-col-delete
nnoremap tc :table_delete_column
" 删除当前行
exmap table_delete_row obcommand editor:table-row-delete
nnoremap tr :table_delete_row
" 在左侧新增列
exmap table_add_before_column obcommand editor:table-col-before
nnoremap tH :table_add_before_column
" 在右侧新增列
exmap table_add_after_column obcommand editor:table-col-after
nnoremap tL :table_add_after_column
" 在上方新增行
exmap table_add_before_row obcommand editor:table-row-before
nnoremap tK :table_add_before_row
" 在下方新增行
exmap table_add_after_row obcommand editor:table-row-after
nnoremap tJ :table_add_after_row
" 将当前列左移
exmap table_move_before_column obcommand editor:table-col-left
nnoremap th :table_move_before_column
" 将当前列右移
exmap table_move_after_column obcommand editor:table-col-right
nnoremap tl :table_move_after_column
" 将当前行上移
exmap table_move_up_row obcommand editor:table-row-up
nnoremap tk :table_move_up_row
" 将当前行下移
exmap table_move_down_row obcommand editor:table-row-down
nnoremap tj :table_move_down_row
" 左对齐
exmap table_align_left_column obcommand editor:table-col-align-left
nnoremap t<A-l> :table_align_left_column
" 右对齐
exmap table_align_right_column obcommand editor:table-col-align-right
nnoremap t<A-r> :table_align_right_column
" 居中对齐
exmap table_align_center_column obcommand editor:table-col-align-center
nnoremap t<A-c> :table_align_center_column

" ================
" === Surround ===
" ================

" 删除可视模式 s 的原功能
vunmap s

" 双引号
exmap surround_double_quotes_en surround " "
vnoremap s" :surround_double_quotes_en
exmap surround_double_quotes_cn surround “ ”
vnoremap sk :surround_double_quotes_cn
" 单引号
exmap surround_single_quotes_en surround ' '
vnoremap s' :surround_single_quotes_en
exmap surround_single_quotes_cn surround ‘ ’
vnoremap sf :surround_single_quotes_cn
" 反引号
exmap surround_backticks surround ` `
vnoremap s` :surround_backticks
" 圆括号
exmap surround_brackets_en surround ( )
vnoremap s( :surround_brackets_en
exmap surround_brackets_cn surround （ ）
vnoremap se :surround_brackets_cn
" 方括号
exmap surround_square_brackets surround [ ]
vnoremap s[ :surround_square_brackets
" 花括号
exmap surround_curly_brackets surround { }
vnoremap s{ :surround_curly_brackets
" 尖括号
exmap surround_sharp_brackets surround < >
vnoremap s< :surround_sharp_brackets
