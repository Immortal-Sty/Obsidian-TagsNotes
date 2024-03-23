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
