" 删除可视模式 s 的原功能
vunmap s

" ==================
" === 普通成对字符 ===
" ==================

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
vnoremap sq :surround_backticks

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

" ================
" === Markdown ===
" ================

" 公式块
exmap surround_latex surround $ $
vnoremap s$ :surround_latex

" 斜体
exmap surround_italics surround * *
vnoremap s_ :surround_italics
vnoremap si :surround_italics

" 粗体
exmap surround_bold surround ** **
vnoremap s* :surround_bold
vnoremap sb :surround_bold

" 高亮
exmap surround_highlight surround == ==
vnoremap s= :surround_highlight
vnoremap sh :surround_highlight
