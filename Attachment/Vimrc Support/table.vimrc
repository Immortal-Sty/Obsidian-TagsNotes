" 插入表格
exmap new_table obcommand editor:insert-table
nnoremap tt :new_table

" ===========
" === 删除 ===
" ===========

" 删除当前列
exmap table_delete_column obcommand editor:table-col-delete
nnoremap tc :table_delete_column

" 删除当前行
exmap table_delete_row obcommand editor:table-row-delete
nnoremap tr :table_delete_row

" ===========
" === 新增 ===
" ===========

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

" ===========
" === 移动 ===
" ===========

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

" ===========
" === 对齐 ===
" ===========

" 左对齐
exmap table_align_left_column obcommand editor:table-col-align-left
nnoremap t<A-l> :table_align_left_column

" 右对齐
exmap table_align_right_column obcommand editor:table-col-align-right
nnoremap t<A-r> :table_align_right_column

" 居中对齐
exmap table_align_center_column obcommand editor:table-col-align-center
nnoremap t<A-c> :table_align_center_column
