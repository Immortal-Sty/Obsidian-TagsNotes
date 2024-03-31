// 按标题移动光标
function jumpHeading(isForward) {
  let cursor = editor.getCursor();
  let line = cursor.line;

  do {
    line += isForward ? 1 : -1;
    if (line < 0 && !isForward) {
      line = editor.lineCount();
    }
    if (line >= editor.lineCount() && isForward) {
      line = 0;
    }

    let lineString = editor.getLine(line);
    if (/^#{1,6} /.test(lineString)) {
      cursor.line = line;
      editor.setCursor(cursor);
      break;
    }
  } while (line != cursor.line);
}

// 按链接移动光标
function jumpNextLink(isForward) {
	const editor = view.editor;
	let posToSearchFrom = editor.getCursor();
	posToSearchFrom.line += isForward ? 0 : -1;
	const cursorOffset = editor.posToOffset(posToSearchFrom);
	const lookupToUse = isForward ? regexIndexOf : regexLastIndexOf;
	let headingOffset = lookupToUse(editor.getValue(), /\[\[/g, cursorOffset);
	// If not found from the cursor position, try again from the document beginning (or reverse beginning)
	if (headingOffset === -1)
		headingOffset = lookupToUse(editor.getValue(), /\[\[/g);
	const newPos = editor.offsetToPos(headingOffset+2);
	editor.setCursor(newPos);
}
