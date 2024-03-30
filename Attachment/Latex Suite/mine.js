[
    // =================
    // === 开始 LATEX ===
    // =================

    // 希腊字符
    {trigger: "\\a ", replacement: "\\alpha ", options: "mA"},
    // {trigger: "\\A ", replacement: "\\alpha ", options: "mA"},
    {trigger: "\\b ", replacement: "\\beta ", options: "mA"},
    // {trigger: "\\B ", replacement: "\\beta ", options: "mA"},
    {trigger: "\\c ", replacement: "\\chi ", options: "mA"},
    // {trigger: "\\C ", replacement: "\\chi ", options: "mA"},
    {trigger: "\\d ", replacement: "\\delta ", options: "mA"},
    {trigger: "\\D ", replacement: "\\Delta ", options: "mA"},
    {trigger: "\\ep ", replacement: "\\epsilon ", options: "mA"},
    // {trigger: "\\Ep ", replacement: "\\epsilon ", options: "mA"},
    {trigger: "\\e ", replacement: "\\eta ", options: "mA"},
    // {trigger: "\\E ", replacement: "\\eta ", options: "mA"},
    {trigger: "\\g ", replacement: "\\gamma ", options: "mA"},
    {trigger: "\\G ", replacement: "\\Gamma ", options: "mA"},
    {trigger: "\\i ", replacement: "\\iota ", options: "mA"},
    // {trigger: "\\I ", replacement: "\\iota ", options: "mA"},
    {trigger: "\\k ", replacement: "\\kappa ", options: "mA"},
    // {trigger: "\\K ", replacement: "\\kappa ", options: "mA"},
    {trigger: "\\l ", replacement: "\\lambda ", options: "mA"},
    {trigger: "\\L ", replacement: "\\Lambda ", options: "mA"},
    {trigger: "\\m ", replacement: "\\mu ", options: "mA"},
    // {trigger: "\\M ", replacement: "\\mu ", options: "mA"},
    {trigger: "\\n ", replacement: "\\nu ", options: "mA"},
    // {trigger: "\\N ", replacement: "\\nu ", options: "mA"},
    {trigger: "\\o ", replacement: "\\omega ", options: "mA"},
    {trigger: "\\O ", replacement: "\\Omega ", options: "mA"},
    {trigger: "\\om ", replacement: "\\omicron ", options: "mA"},
    // {trigger: "\\Om ", replacement: "\\omicron ", options: "mA"},
    {trigger: "\\p ", replacement: "\\pi ", options: "mA"},
    {trigger: "\\P ", replacement: "\\Pi ", options: "mA"},
    {trigger: "\\ph ", replacement: "\\phi ", options: "mA"},
    {trigger: "\\Ph ", replacement: "\\Phi ", options: "mA"},
    {trigger: "\\ps ", replacement: "\\psi ", options: "mA"},
    {trigger: "\\Ps ", replacement: "\\Psi ", options: "mA"},
    {trigger: "\\r ", replacement: "\\rho ", options: "mA"},
    // {trigger: "\\R ", replacement: "\\rho ", options: "mA"},
    {trigger: "\\s ", replacement: "\\sigma ", options: "mA"},
    {trigger: "\\S ", replacement: "\\Sigma ", options: "mA"},
    {trigger: "\\t ", replacement: "\\tau ", options: "mA"},
    // {trigger: "\\T ", replacement: "\\tau ", options: "mA"},
    {trigger: "\\th ", replacement: "\\theta ", options: "mA"},
    {trigger: "\\Th ", replacement: "\\Theta ", options: "mA"},
    {trigger: "\\u ", replacement: "\\upsilon ", options: "mA"},
    {trigger: "\\U ", replacement: "\\Upsilon ", options: "mA"},
    {trigger: "\\ve ", replacement: "\\varepsilon ", options: "mA"},
    // {trigger: "\\vE ", replacement: "\\varepsilon ", options: "mA"},
    {trigger: "\\vp ", replacement: "\\varphi ", options: "mA"},
    {trigger: "\\vP ", replacement: "\\varPhi ", options: "mA"},
    {trigger: "\\x ", replacement: "\\xi ", options: "mA"},
    {trigger: "\\X ", replacement: "\\Xi ", options: "mA"},
    {trigger: "\\z ", replacement: "\\zeta ", options: "mA"},
    // {trigger: "\\Z ", replacement: "\\zeta ", options: "mA"},

    // 数学符号
    {trigger: "ooo ", replacement: "\\infty ", options: "mA"},

    // 计算符号
    {trigger: "\\f ", replacement: "\\dfrac{ $0}{ $1}$2", options: "MA"},
    {trigger: "\\f ", replacement: "\\tfrac{ $0}{ $1}$2", options: "nA"},
    {trigger: "xx ", replacement: "\\times ", options: "mA"},
    {trigger: "** ", replacement: "\\cdot ", options: "mA"},
    {trigger: "_ ", replacement: "_{ $0}$1", options: "mA"},
    {trigger: "^ ", replacement: "^{ $0}$1", options: "mA"},
    {trigger: "\\lim_ ", replacement: "\\lim_{ ${0:n }\\to ${1:\\infty }}$2", options: "mA"},
    {trigger: "\\int ", replacement: "\\int ${0:f \\left ( x \\right ) }\\mathrm{ d } ${1:x}", options: "mA"},
    {trigger: "\\int_ ", replacement: "\\int_{ $0}^{ $1} ${2:f \\left ( x \\right ) }\\mathrm{ d } ${3:x}", options: "mA"},
    {trigger: "\\sum_ ", replacement: "\\sum_{ ${0:i = 0 }}^{ ${1:n }}$2", options: "mA"},
    {trigger: "c... ", replacement: "\\cdots ", options: "mA"},
    {trigger: "v... ", replacement: "\\vdots ", options: "mA"},
    {trigger: "d... ", replacement: "\\ddots ", options: "mA"},
    {trigger: "!= ", replacement: "\\neq ", options: "mA"},
    {trigger: ">= ", replacement: "\\geq ", options: "mA"},
    {trigger: "<= ", replacement: "\\leq ", options: "mA"},
    {trigger: ">> ", replacement: "\\gg ", options: "mA"},
    {trigger: "<< ", replacement: "\\ll ", options: "mA"},
    {trigger: "=== ", replacement: "\\equiv ", options: "mA"},
    {trigger: "+- ", replacement: "\\pm ", options: "mA"},
    {trigger: "-+ ", replacement: "\\mp ", options: "mA"},
    {trigger: "\\and ", replacement: "\\cap ", options: "mA"},
    {trigger: "\\or ", replacement: "\\cup ", options: "mA"},

    // 括号
    {trigger: "( ", replacement: "\\left ( $0\\right )$1", options: "mA"},
    {trigger: "[ ", replacement: "\\left [ $0\\right ]$1", options: "mA"},
    {trigger: "{ ", replacement: "{ $0}$1", options: "mA"},
    {trigger: "\\{ ", replacement: "\\left \\{ $0\\right \\}$1", options: "mA"},

    // 环境
    {trigger: "\\beg", replacement: "\\begin{$0}\n$1\n\\end{$0}", options: "mA"},

    // ====================
    // === Obsidian 开始 ===
    // ====================

    // 符号配对
    {trigger: "'", replacement: "'$0'$1", options: "tA"},
    {trigger: "\"", replacement: "\"$0\"$1", options: "tA"},
    {trigger: /(?<!`)`/, replacement: "`$0`$1", options: "tA"},
    {trigger: "_", replacement: "_$0_$1", options: "tA"},
    {trigger: "**", replacement: "**$0**$1", options: "tA"},
    {trigger: "(", replacement: "($0)$1", options: "tA"},
    {trigger: "[", replacement: "[$0]$1", options: "tA"},
    {trigger: "{", replacement: "{$0}$1", options: "tA"},

    // 常用 html 标签简化补全
    {trigger: "<jdt ", replacement: "<progress max=$0 value=$1></progress>$2", options: "tA"},

    // 补全内嵌属性语法
    {trigger: "[; ", replacement: "[$0 :: $1", options: "tA"},
    {trigger: "(; ", replacement: "($0 :: $1", options: "tA"},

    // 快速生成表格
 //    {trigger: /(\d)asdf(\d)/, replacement: (match) => {
	// 	const m = match[1];
	// 	const n = match[2];
 //
	// 	let table_row = "|";
	// 	let table_row_first = "| $0";
	// 	let table_row_ = "|";
 //
	// 	for (let i = 0; i < m; ++i)
	// 	{
	// 		table_row += "   |";
	// 		table_row_first += "   |";
	// 		table_row_ += " - |";
	// 	}
 //
	// 	let table_all += `\n${table_row_}`;
 //
	// 	for (let i = 1; i < n; ++i)
	// 	{
	// 		table_all += `\n${table_row}`;
	// 	}
 //
	// 	return table_all;
	// }, options: "t"},
]
