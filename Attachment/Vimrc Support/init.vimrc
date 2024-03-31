source table.vimrc
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

" 回到上次更改的地方
nnoremap g; u<C-r>

" 上一个标题
"exmap prevHeading jsfile vimrc.js {jumpHeading(false)}
exmap prevHeading jscommand {let cursor = editor.getCursor(); let line = cursor.line; do { line += -1; if (line < 0) { line = editor.lineCount(); } let lineString = editor.getLine(line); if (/^#{1,6} /.test(lineString)) { cursor.line = line; editor.setCursor(cursor); break; } } while (line != cursor.line); }
nnoremap [[ :prevHeading
" 下一个标题
"exmap nextHeading jsfile vimrc.js {jumpHeading(true)}
exmap nextHeading jscommand { let cursor = editor.getCursor(); let line = cursor.line; do { line += 1; if (line >= editor.lineCount()) { line = 0; } let lineString = editor.getLine(line); if (/^#{1,6} /.test(lineString)) { cursor.line = line; editor.setCursor(cursor); break; } } while (line != cursor.line); }
nnoremap ]] :nextHeading

" 上一个链接
"exmap prevLink jsfile vimrc.js {jumpNextLink(false)}
exmap prevLink jscommand { const editor = view.editor; let posToSearchFrom = editor.getCursor(); posToSearchFrom.line += -1; const cursorOffset = editor.posToOffset(posToSearchFrom); const lookupToUse = regexLastIndexOf; let headingOffset = lookupToUse(editor.getValue(), /\[\[/g, cursorOffset); if (headingOffset === -1) headingOffset = lookupToUse(editor.getValue(), /\[\[/g); const newPos = editor.offsetToPos(headingOffset+2); editor.setCursor(newPos); }
nunmap ,
nmap ,, :prevLink
" 下一个链接
"exmap nextLink jsfile vimrc.js {jumpNextLink(true)}
exmap nextLink jscommand { const editor = view.editor; let posToSearchFrom = editor.getCursor(); posToSearchFrom.line += 0; const cursorOffset = editor.posToOffset(posToSearchFrom); const lookupToUse = regexIndexOf; let headingOffset = lookupToUse(editor.getValue(), /\[\[/g, cursorOffset); if (headingOffset === -1) headingOffset = lookupToUse(editor.getValue(), /\[\[/g); const newPos = editor.offsetToPos(headingOffset+2); editor.setCursor(newPos); }
nunmap .
nmap .. :nextLink
" 打开链接在当前页面
exmap openlink obcommand editor:follow-link
nnoremap go :openlink
" 打开链接在新窗口中
exmap openlink_windows obcommand editor:open-link-in-new-window
nnoremap gw :openlink_windows

" =============
" === Table ===
" =============


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
" 公式块
exmap surround_latex surround $ $
vnoremap s$ :surround_latex
