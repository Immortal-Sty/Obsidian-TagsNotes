/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/index.ts
var import_state3 = require("@codemirror/state");
var import_view2 = require("@codemirror/view");

// src/Overlay.ts
var import_view = require("@codemirror/view");

// src/Config.ts
var import_state = require("@codemirror/state");
var Config = import_state.Facet.define({
  combine: (c) => {
    const configs = [];
    for (let config of c) {
      if (!config) {
        continue;
      }
      const { create, gutters, ...rest } = config;
      configs.push({
        ...rest,
        enabled: true,
        gutters: gutters ? gutters.filter((v) => Object.keys(v).length > 0) : void 0
      });
    }
    return (0, import_state.combineConfig)(configs, {
      enabled: configs.length > 0,
      displayText: "characters",
      eventHandlers: {},
      showOverlay: "always",
      gutters: [],
      autohide: false
    });
  }
});
var Scale = {
  PixelMultiplier: 2,
  SizeRatio: 4,
  MaxWidth: 120
};

// node_modules/.pnpm/crelt@1.0.6/node_modules/crelt/index.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string")
    elt = document.createElement(elt);
  var i = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next)
      if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string")
          elt.setAttribute(name, value);
        else if (value != null)
          elt[name] = value;
      }
    i++;
  }
  for (; i < arguments.length; i++)
    add(elt, arguments[i]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++)
      add(elt, child[i]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// src/Overlay.ts
var Theme = import_view.EditorView.theme({
  ".cm-minimap-overlay-container": {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    "&.cm-minimap-overlay-mouse-over": {
      opacity: 0,
      transition: "visibility 0s linear 300ms, opacity 300ms"
    },
    "&.cm-minimap-overlay-mouse-over:hover": {
      opacity: 1,
      transition: "visibility 0s linear 0ms, opacity 300ms"
    },
    "&.cm-minimap-overlay-off": {
      display: "none"
    },
    "& .cm-minimap-overlay": {
      background: "var(--background-modifier-border-focus)",
      opacity: "0.2",
      position: "absolute",
      right: 0,
      top: 0,
      width: "100%",
      transition: "top 0s ease-in 0ms",
      "&:hover": {
        opacity: "0.3"
      }
    },
    "&.cm-minimap-overlay-active": {
      opacity: 1,
      visibility: "visible",
      transition: "visibility 0s linear 0ms, opacity 300ms",
      "& .cm-minimap-overlay": {
        opacity: "0.4"
      }
    }
  }
});
var SCALE = Scale.PixelMultiplier * Scale.SizeRatio;
var OverlayView = import_view.ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this._isDragging = false;
    if (view.state.facet(Config).enabled) {
      this.create(view);
    }
  }
  create(view) {
    this.container = crelt("div", { class: "cm-minimap-overlay-container" });
    this.dom = crelt("div", { class: "cm-minimap-overlay" });
    this.container.appendChild(this.dom);
    this.container.addEventListener("mousedown", this.onMouseDown.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    const inner = view.dom.querySelector(".cm-minimap-inner");
    if (inner) {
      inner.appendChild(this.container);
    }
    this.computeShowOverlay();
    this.computeHeight();
    this.computeTop();
  }
  remove() {
    if (this.container) {
      this.container.removeEventListener("mousedown", this.onMouseDown);
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);
      this.container.remove();
    }
  }
  update(update) {
    const prev = update.startState.facet(Config).enabled;
    const now = update.state.facet(Config).enabled;
    if (prev && !now) {
      this.remove();
      return;
    }
    if (!prev && now) {
      this.create(update.view);
    }
    if (now) {
      this.computeShowOverlay();
      if (update.geometryChanged) {
        this.computeHeight();
        this.computeTop();
      }
    }
  }
  computeHeight() {
    if (!this.dom) {
      return;
    }
    const height = this.view.dom.clientHeight / SCALE;
    this.dom.style.height = height + "px";
  }
  computeTop() {
    if (!this._isDragging && this.dom) {
      const { clientHeight, scrollHeight, scrollTop } = this.view.scrollDOM;
      const maxScrollTop = scrollHeight - clientHeight;
      const topForNonOverflowing = scrollTop / SCALE;
      const height = clientHeight / SCALE;
      const maxTop = clientHeight - height;
      let scrollRatio = scrollTop / maxScrollTop;
      if (isNaN(scrollRatio))
        scrollRatio = 0;
      const topForOverflowing = maxTop * scrollRatio;
      const top = Math.min(topForOverflowing, topForNonOverflowing);
      this.dom.style.top = top + "px";
    }
  }
  computeShowOverlay() {
    if (!this.container) {
      return;
    }
    const { showOverlay } = this.view.state.facet(Config);
    if (showOverlay === "mouse-over") {
      this.container.classList.add("cm-minimap-overlay-mouse-over");
    } else {
      this.container.classList.remove("cm-minimap-overlay-mouse-over");
    }
    const { clientHeight, scrollHeight } = this.view.scrollDOM;
    if (clientHeight === scrollHeight) {
      this.container.classList.add("cm-minimap-overlay-off");
    } else {
      this.container.classList.remove("cm-minimap-overlay-off");
    }
  }
  onMouseDown(event) {
    if (!this.container) {
      return;
    }
    if (event.button === 2) {
      return;
    }
    const { clientY, target } = event;
    if (target === this.dom) {
      this._dragStartY = event.clientY;
      this._isDragging = true;
      this.container.classList.add("cm-minimap-overlay-active");
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = this.view.scrollDOM;
    const targetTop = target.getBoundingClientRect().top;
    const deltaY = (clientY - targetTop) * SCALE;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const visibleRange = clientHeight * SCALE - clientHeight;
    const visibleTop = visibleRange * scrollRatio;
    const top = Math.max(0, scrollTop - visibleTop);
    this.view.scrollDOM.scrollTop = top + deltaY - clientHeight / 2;
  }
  onMouseUp(_event) {
    if (this._isDragging && this.container) {
      this._dragStartY = void 0;
      this._isDragging = false;
      this.container.classList.remove("cm-minimap-overlay-active");
    }
  }
  onMouseMove(event) {
    if (!this._isDragging || !this.dom) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (!this._dragStartY) {
      this._dragStartY = event.clientY;
      return;
    }
    const deltaY = event.clientY - this._dragStartY;
    const movingUp = deltaY < 0;
    const movingDown = deltaY > 0;
    this._dragStartY = event.clientY;
    const canvasHeight = this.dom.getBoundingClientRect().height;
    const canvasAbsTop = this.dom.getBoundingClientRect().y;
    const canvasAbsBot = canvasAbsTop + canvasHeight;
    const canvasRelTopDouble = parseFloat(this.dom.style.top);
    const scrollPosition = this.view.scrollDOM.scrollTop;
    const editorHeight = this.view.scrollDOM.clientHeight;
    const contentHeight = this.view.scrollDOM.scrollHeight;
    const atTop = scrollPosition === 0;
    const atBottom = Math.round(scrollPosition) >= Math.round(contentHeight - editorHeight);
    if (atTop && movingUp || atTop && event.clientY < canvasAbsTop) {
      return;
    }
    if (atBottom && movingDown || atBottom && event.clientY > canvasAbsBot) {
      return;
    }
    const scrollHeight = this.view.scrollDOM.scrollHeight;
    const clientHeight = this.view.scrollDOM.clientHeight;
    const maxTopNonOverflowing = (scrollHeight - clientHeight) / SCALE;
    const maxTopOverflowing = clientHeight - clientHeight / SCALE;
    const change = canvasRelTopDouble + deltaY;
    const relativeToMax = change / maxTopOverflowing;
    const scrollPosOverflowing = (scrollHeight - clientHeight) * relativeToMax;
    const scrollPosNonOverflowing = change * SCALE;
    this.view.scrollDOM.scrollTop = Math.max(scrollPosOverflowing, scrollPosNonOverflowing);
    const top = Math.min(Math.max(0, change), Math.min(maxTopOverflowing, maxTopNonOverflowing));
    this.dom.style.top = top + "px";
  }
  destroy() {
    this.remove();
  }
}, {
  eventHandlers: {
    scroll() {
      requestAnimationFrame(() => this.computeTop());
    }
  }
});
var Overlay = [Theme, OverlayView];

// src/diagnostics.ts
var import_lint = require("@codemirror/lint");

// src/linebasedstate.ts
var LineBasedState = class {
  constructor(view) {
    this.map = /* @__PURE__ */ new Map();
    this.view = view;
  }
  get(lineNumber) {
    return this.map.get(lineNumber);
  }
  set(lineNumber, value) {
    this.map.set(lineNumber, value);
  }
};

// src/LinesState.ts
var import_language = require("@codemirror/language");
var import_state2 = require("@codemirror/state");
function computeLinesState(state) {
  var _a;
  console.log(state.facet(Config));
  if (!state.facet(Config).enabled) {
    return [];
  }
  const lines = [];
  const lineCursor = state.doc.iterLines();
  const foldedRangeCursor = (0, import_language.foldedRanges)(state).iter();
  let textOffset = 0;
  lineCursor.next();
  while (!lineCursor.done) {
    const lineText = lineCursor.value;
    let from = textOffset;
    let to = from + lineText.length;
    while (foldedRangeCursor.value && foldedRangeCursor.to < from) {
      foldedRangeCursor.next();
    }
    const { from: foldFrom, to: foldTo } = foldedRangeCursor;
    const lineStartInFold = from >= foldFrom && from < foldTo;
    const lineEndsInFold = to > foldFrom && to <= foldTo;
    if (lineStartInFold) {
      let lastLine = (_a = lines.pop()) != null ? _a : [];
      let lastRange = lastLine.pop();
      if (lastRange && lastRange.folded) {
        lastRange.to = foldTo;
      }
      if (lastRange) {
        lastLine.push(lastRange);
      }
      if (!lastRange || !lastRange.folded) {
        lastLine.push({ from: foldFrom, to: foldTo, folded: true });
      }
      if (!lineEndsInFold) {
        lastLine.push({ from: foldTo, to, folded: false });
      }
      lines.push(lastLine);
    } else if (lineEndsInFold) {
      lines.push([
        { from, to: foldFrom, folded: false },
        { from: foldFrom, to: foldTo, folded: true }
      ]);
    } else {
      lines.push([{ from, to, folded: false }]);
    }
    textOffset = to + 1;
    lineCursor.next();
  }
  return lines;
}
var LinesState = import_state2.StateField.define({
  create: (state) => computeLinesState(state),
  update: (current, tr) => {
    if (foldsChanged([tr]) || tr.docChanged) {
      return computeLinesState(tr.state);
    }
    return current;
  }
});
function foldsChanged(transactions) {
  return transactions.find((tr) => tr.effects.find((ef) => ef.is(import_language.foldEffect) || ef.is(import_language.unfoldEffect)));
}

// src/diagnostics.ts
var DiagnosticState = class extends LineBasedState {
  constructor(view) {
    super(view);
    this.count = void 0;
  }
  shouldUpdate(update) {
    if (!update.state.facet(Config).enabled) {
      return false;
    }
    if (update.docChanged) {
      return true;
    }
    for (const tr of update.transactions) {
      for (const ef of tr.effects) {
        if (ef.is(import_lint.setDiagnosticsEffect)) {
          return true;
        }
      }
    }
    if (foldsChanged(update.transactions)) {
      return true;
    }
    if (this.count === void 0) {
      return true;
    }
    return false;
  }
  update(update) {
    if (!this.shouldUpdate(update)) {
      return;
    }
    this.map.clear();
    const lines = update.state.field(LinesState);
    this.count = (0, import_lint.diagnosticCount)(update.state);
    (0, import_lint.forEachDiagnostic)(update.state, (diagnostic, from, to) => {
      const lineStart = this.findLine(from, lines);
      const lineEnd = this.findLine(to, lines);
      let severity = diagnostic.severity;
      for (let i = lineStart; i <= lineEnd; i++) {
        const previous = this.get(i);
        if (previous) {
          severity = [severity, previous].sort(this.sort.bind(this)).slice(0, 1)[0];
        }
        this.set(i, severity);
      }
    });
  }
  drawLine(ctx, lineNumber) {
    const { context, lineHeight, offsetX, offsetY } = ctx;
    const severity = this.get(lineNumber);
    if (!severity) {
      return;
    }
    context.globalAlpha = 0.65;
    context.beginPath();
    context.rect(offsetX, offsetY, context.canvas.width - offsetX, lineHeight);
    context.fillStyle = this.color(severity);
    context.fill();
  }
  findLine(pos, lines) {
    const index = lines.findIndex((spans) => {
      const start = spans.slice(0, 1)[0];
      const end = spans.slice(-1)[0];
      if (!start || !end) {
        return false;
      }
      return start.from <= pos && pos <= end.to;
    });
    return index + 1;
  }
  color(severity) {
    return severity === "error" ? "#d11" : severity === "warning" ? "orange" : "#999";
  }
  sort(a, b) {
    return this.score(b) - this.score(a);
  }
  score(s) {
    switch (s) {
      case "error": {
        return 3;
      }
      case "warning": {
        return 2;
      }
      default: {
        return 1;
      }
    }
  }
};
function diagnostics(view) {
  return new DiagnosticState(view);
}

// src/selections.ts
var SelectionState = class extends LineBasedState {
  constructor(view) {
    super(view);
    this.getDrawInfo();
    this._themeClasses = view.dom.classList.value;
  }
  shouldUpdate(update) {
    if (!update.state.facet(Config).enabled) {
      return false;
    }
    if (update.docChanged) {
      return true;
    }
    if (update.selectionSet) {
      return true;
    }
    if (this._themeClasses !== this.view.dom.classList.value) {
      return true;
    }
    if (foldsChanged(update.transactions)) {
      return true;
    }
    return false;
  }
  update(update) {
    if (!this.shouldUpdate(update)) {
      return;
    }
    this.map.clear();
    if (this._themeClasses !== this.view.dom.classList.value) {
      this._drawInfo = void 0;
      this._themeClasses = this.view.dom.classList.value;
    }
    const { ranges } = update.state.selection;
    let selectionIndex = 0;
    for (const [index, line] of update.state.field(LinesState).entries()) {
      const selections2 = [];
      let offset = 0;
      for (const span of line) {
        do {
          if (selectionIndex >= ranges.length) {
            continue;
          }
          if (span.to < ranges[selectionIndex].from) {
            continue;
          }
          if (ranges[selectionIndex].from === ranges[selectionIndex].to) {
            selectionIndex++;
            continue;
          }
          const range = ranges[selectionIndex];
          const selection = {
            from: offset + Math.max(span.from, range.from) - span.from,
            to: offset + Math.min(span.to, range.to) - span.from,
            extends: range.to > span.to
          };
          const lastSelection = selections2.slice(-1)[0];
          if (lastSelection && lastSelection.to === selection.from) {
            let { to } = selection;
            if (span.folded && selection.extends) {
              to = selection.from + 1;
            } else if (span.folded && !selection.extends) {
              to = lastSelection.to;
            }
            selections2[selections2.length - 1] = {
              ...lastSelection,
              to,
              extends: selection.extends
            };
          } else if (!span.folded) {
            selections2.push(selection);
          }
          if (selection.extends) {
            break;
          }
          selectionIndex++;
        } while (selectionIndex < ranges.length && span.to >= ranges[selectionIndex].from);
        offset += span.folded ? 1 : span.to - span.from;
      }
      if (selections2.length === 0) {
        continue;
      }
      const lineNumber = index + 1;
      this.map.set(lineNumber, selections2);
    }
  }
  drawLine(ctx, lineNumber) {
    let {
      context,
      lineHeight,
      charWidth,
      offsetX: startOffsetX,
      offsetY
    } = ctx;
    const selections2 = this.get(lineNumber);
    if (!selections2) {
      return;
    }
    for (const selection of selections2) {
      const offsetX = startOffsetX + selection.from * charWidth;
      const textWidth = (selection.to - selection.from) * charWidth;
      const fullWidth = context.canvas.width - offsetX;
      if (selection.extends) {
        context.globalAlpha = 0.65;
        context.beginPath();
        context.rect(offsetX, offsetY, fullWidth, lineHeight);
        context.fillStyle = this.getDrawInfo().backgroundColor;
        context.fill();
      }
      context.globalAlpha = 1;
      context.beginPath();
      context.rect(offsetX, offsetY, textWidth, lineHeight);
      context.fillStyle = this.getDrawInfo().backgroundColor;
      context.fill();
    }
  }
  getDrawInfo() {
    if (this._drawInfo) {
      return this._drawInfo;
    }
    const mockToken = document.createElement("span");
    mockToken.setAttribute("class", "cm-selectionBackground");
    this.view.dom.appendChild(mockToken);
    const style = window.getComputedStyle(mockToken);
    const result = { backgroundColor: style.backgroundColor };
    this._drawInfo = result;
    this.view.dom.removeChild(mockToken);
    return result;
  }
};
function selections(view) {
  return new SelectionState(view);
}

// src/text.ts
var import_highlight = require("@lezer/highlight");
var import_common = require("@lezer/common");
var import_language2 = require("@codemirror/language");
var TextState = class extends LineBasedState {
  constructor(view) {
    super(view);
    this._fontInfoMap = /* @__PURE__ */ new Map();
    this._themeClasses = new Set(view.dom.classList.values());
    if (view.state.facet(Config).enabled) {
      this.updateImpl(view.state);
    }
  }
  shouldUpdate(update) {
    if (update.docChanged) {
      return true;
    }
    if (update.state.facet(Config) !== update.startState.facet(Config)) {
      return true;
    }
    if (this.themeChanged()) {
      return true;
    }
    if (foldsChanged(update.transactions)) {
      return true;
    }
    return false;
  }
  update(update) {
    if (!this.shouldUpdate(update)) {
      return;
    }
    if (this._highlightingCallbackId) {
      typeof window.requestIdleCallback !== "undefined" ? cancelIdleCallback(this._highlightingCallbackId) : clearTimeout(this._highlightingCallbackId);
    }
    this.updateImpl(update.state, update.changes);
  }
  updateImpl(state, changes) {
    var _a;
    this.map.clear();
    this._displayText = state.facet(Config).displayText;
    if (this.themeChanged()) {
      this._fontInfoMap.clear();
    }
    let treeFragments = void 0;
    if (this._previousTree && changes) {
      const previousFragments = import_common.TreeFragment.addTree(this._previousTree);
      const changedRanges = [];
      changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push({ fromA, toA, fromB, toB }));
      treeFragments = import_common.TreeFragment.applyChanges(previousFragments, changedRanges);
    }
    const docToString = state.doc.toString();
    const parser = (_a = state.facet(import_language2.language)) == null ? void 0 : _a.parser;
    const tree = parser && Object.keys(parser).length > 0 ? parser.parse(docToString || "", treeFragments) : void 0;
    this._previousTree = tree;
    const highlighter = {
      style: (tags) => (0, import_language2.highlightingFor)(state, tags)
    };
    let highlights = [];
    if (tree) {
      const vpLineTop = state.doc.lineAt(this.view.viewport.from).number;
      const vpLineBottom = state.doc.lineAt(this.view.viewport.to).number;
      const vpLineCount = vpLineBottom - vpLineTop;
      const vpScroll = vpLineTop / (state.doc.lines - vpLineCount);
      const { SizeRatio, PixelMultiplier } = Scale;
      const mmLineCount = vpLineCount * SizeRatio * PixelMultiplier;
      const mmLineRatio = vpScroll * mmLineCount;
      const mmLineTop = Math.max(1, Math.floor(vpLineTop - mmLineRatio));
      const mmLineBottom = Math.min(vpLineBottom + Math.floor(mmLineCount - mmLineRatio), state.doc.lines);
      (0, import_highlight.highlightTree)(tree, highlighter, (from, to, tags) => {
        highlights.push({ from, to, tags });
      }, state.doc.line(mmLineTop).from, state.doc.line(mmLineBottom).to);
    }
    this.updateMapImpl(state, highlights);
    highlights = [];
    const highlightingCallback = () => {
      if (tree) {
        (0, import_highlight.highlightTree)(tree, highlighter, (from, to, tags) => {
          highlights.push({ from, to, tags });
        });
        this.updateMapImpl(state, highlights);
        this._highlightingCallbackId = void 0;
      }
    };
    this._highlightingCallbackId = typeof window.requestIdleCallback !== "undefined" ? requestIdleCallback(highlightingCallback) : setTimeout(highlightingCallback);
  }
  updateMapImpl(state, highlights) {
    this.map.clear();
    const docToString = state.doc.toString();
    const highlightsIterator = highlights.values();
    let highlightPtr = highlightsIterator.next();
    for (const [index, line] of state.field(LinesState).entries()) {
      const spans = [];
      for (const span of line) {
        if (span.from === span.to) {
          continue;
        }
        if (span.folded) {
          spans.push({ text: "\u2026", tags: "" });
          continue;
        }
        let position = span.from;
        while (!highlightPtr.done && highlightPtr.value.from < span.to) {
          const { from, to, tags } = highlightPtr.value;
          if (to < position) {
            highlightPtr = highlightsIterator.next();
            continue;
          }
          if (from > position) {
            spans.push({ text: docToString.slice(position, from), tags: "" });
          }
          const start = Math.max(from, span.from);
          const end = Math.min(to, span.to);
          spans.push({ text: docToString.slice(start, end), tags });
          position = end;
          if (to > end) {
            break;
          }
          highlightPtr = highlightsIterator.next();
        }
        if (position !== span.to) {
          spans.push({
            text: docToString.slice(position, span.to),
            tags: ""
          });
        }
      }
      const lineNumber = index + 1;
      this.map.set(lineNumber, spans);
    }
  }
  measure(context) {
    const { color, font, lineHeight } = this.getFontInfo("");
    context.textBaseline = "ideographic";
    context.fillStyle = color;
    context.font = font;
    return {
      charWidth: context.measureText("_").width,
      lineHeight
    };
  }
  beforeDraw() {
    this._fontInfoMap.clear();
  }
  drawLine(ctx, lineNumber) {
    const line = this.get(lineNumber);
    if (!line) {
      return;
    }
    let { context, charWidth, lineHeight, offsetX, offsetY } = ctx;
    let prevInfo;
    context.textBaseline = "ideographic";
    for (const span of line) {
      const info = this.getFontInfo(span.tags);
      if (!prevInfo || prevInfo.color !== info.color) {
        context.fillStyle = info.color;
      }
      if (!prevInfo || prevInfo.font !== info.font) {
        context.font = info.font;
      }
      prevInfo = info;
      lineHeight = Math.max(lineHeight, info.lineHeight);
      switch (this._displayText) {
        case "characters": {
          context.fillText(span.text, offsetX, offsetY + lineHeight);
          offsetX += span.text.length * charWidth;
          break;
        }
        case "blocks": {
          const nonWhitespace = /\S+/g;
          let start;
          while ((start = nonWhitespace.exec(span.text)) !== null) {
            const startX = offsetX + start.index * charWidth;
            let width = (nonWhitespace.lastIndex - start.index) * charWidth;
            if (startX > context.canvas.width) {
              break;
            }
            if (startX + width > context.canvas.width) {
              width = context.canvas.width - startX;
            }
            const yBuffer = 2 / Scale.SizeRatio;
            const height = lineHeight - yBuffer;
            context.fillStyle = info.color;
            context.globalAlpha = 0.65;
            context.beginPath();
            context.rect(startX, offsetY, width, height);
            context.fill();
          }
          offsetX += span.text.length * charWidth;
          break;
        }
      }
    }
  }
  getFontInfo(tags) {
    const cached = this._fontInfoMap.get(tags);
    if (cached) {
      return cached;
    }
    const mockToken = crelt("span", { class: tags });
    const mockLine = crelt("div", { class: "cm-line", style: "display: none" }, mockToken);
    this.view.contentDOM.appendChild(mockLine);
    const style = window.getComputedStyle(mockToken);
    const lineHeight = parseFloat(style.lineHeight) / Scale.SizeRatio;
    const result = {
      color: style.color,
      font: `${style.fontStyle} ${style.fontWeight} ${lineHeight}px ${style.fontFamily}`,
      lineHeight
    };
    this._fontInfoMap.set(tags, result);
    this.view.contentDOM.removeChild(mockLine);
    return result;
  }
  themeChanged() {
    const previous = this._themeClasses;
    const now = new Set(this.view.dom.classList.values());
    this._themeClasses = now;
    if (!previous) {
      return true;
    }
    previous.delete("cm-focused");
    now.delete("cm-focused");
    if (previous.size !== now.size) {
      return true;
    }
    let containsAll = true;
    previous.forEach((theme) => {
      if (!now.has(theme)) {
        containsAll = false;
      }
    });
    return !containsAll;
  }
};
function text(view) {
  return new TextState(view);
}

// src/Gutters.ts
var GUTTER_WIDTH = 4;
function drawLineGutter(gutter, ctx, lineNumber) {
  const color = gutter[lineNumber];
  if (!color) {
    return;
  }
  ctx.context.fillStyle = color;
  ctx.context.globalAlpha = 1;
  ctx.context.beginPath();
  ctx.context.rect(ctx.offsetX, ctx.offsetY, GUTTER_WIDTH, ctx.lineHeight);
  ctx.context.fill();
}

// src/index.ts
var Theme2 = import_view2.EditorView.theme({
  "&": {
    height: "100%",
    overflowY: "auto"
  },
  "& .cm-minimap-gutter": {
    borderRight: 0,
    flexShrink: 0,
    left: "unset",
    position: "sticky",
    right: 0,
    top: 0
  },
  "& .cm-minimap-autohide": {
    opacity: 0,
    transition: "opacity 0.3s"
  },
  "& .cm-minimap-autohide:hover": {
    opacity: 1
  },
  "& .cm-minimap-inner": {
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    overflowY: "hidden",
    "& canvas": {
      display: "block"
    }
  },
  "& .cm-minimap-box-shadow": {
    boxShadow: "12px 0px 20px 5px #6c6c6c"
  }
});
var WIDTH_RATIO = 6;
var minimapClass = import_view2.ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.text = text(view);
    this.selection = selections(view);
    this.diagnostic = diagnostics(view);
    if (view.state.facet(showMinimap)) {
      this.create(view);
    }
  }
  create(view) {
    const config = view.state.facet(showMinimap);
    if (!config) {
      throw Error("Expected nonnull");
    }
    this.inner = crelt("div", { class: "cm-minimap-inner" });
    this.canvas = crelt("canvas");
    this.dom = config.create(view).dom;
    this.dom.classList.add("cm-gutters");
    this.dom.classList.add("cm-minimap-gutter");
    this.inner.appendChild(this.canvas);
    this.dom.appendChild(this.inner);
    this.view.scrollDOM.insertBefore(this.dom, this.view.contentDOM.nextSibling);
    for (const key in this.view.state.facet(Config).eventHandlers) {
      const handler = this.view.state.facet(Config).eventHandlers[key];
      if (handler) {
        this.dom.addEventListener(key, (e) => handler(e, this.view));
      }
    }
    if (config.autohide) {
      this.dom.classList.add("cm-minimap-autohide");
    }
  }
  remove() {
    if (this.dom) {
      this.dom.remove();
    }
  }
  update(update) {
    const prev = update.startState.facet(showMinimap);
    const now = update.state.facet(showMinimap);
    if (prev && !now) {
      this.remove();
      return;
    }
    if (!prev && now) {
      this.create(update.view);
    }
    if (now) {
      this.text.update(update);
      this.selection.update(update);
      this.diagnostic.update(update);
      this.render();
    }
  }
  getWidth() {
    const editorWidth = this.view.dom.clientWidth;
    if (editorWidth <= Scale.MaxWidth * WIDTH_RATIO) {
      const ratio = editorWidth / (Scale.MaxWidth * WIDTH_RATIO);
      return Scale.MaxWidth * ratio;
    }
    return Scale.MaxWidth;
  }
  render() {
    if (!this.dom || !this.canvas || !this.inner) {
      return;
    }
    this.text.beforeDraw();
    this.updateBoxShadow();
    this.dom.style.width = this.getWidth() + "px";
    this.canvas.style.maxWidth = this.getWidth() + "px";
    this.canvas.width = this.getWidth() * Scale.PixelMultiplier;
    const domHeight = this.view.dom.getBoundingClientRect().height;
    this.inner.style.minHeight = domHeight + "px";
    this.canvas.height = domHeight * Scale.PixelMultiplier;
    this.canvas.style.height = domHeight + "px";
    const context = this.canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const { charWidth, lineHeight } = this.text.measure(context);
    let { startIndex, endIndex, offsetY } = this.canvasStartAndEndIndex(context, lineHeight);
    const gutters = this.view.state.facet(Config).gutters;
    for (let i = startIndex; i < endIndex; i++) {
      const lines = this.view.state.field(LinesState);
      if (i >= lines.length)
        break;
      const drawContext = {
        offsetX: 0,
        offsetY,
        context,
        lineHeight,
        charWidth
      };
      if (gutters.length) {
        drawContext.offsetX += 2;
        for (let gutter of gutters) {
          drawLineGutter(gutter, drawContext, i + 1);
          drawContext.offsetX += GUTTER_WIDTH;
        }
        drawContext.offsetX += 2;
      }
      this.text.drawLine(drawContext, i + 1);
      this.selection.drawLine(drawContext, i + 1);
      this.diagnostic.drawLine(drawContext, i + 1);
      offsetY += lineHeight;
    }
    context.restore();
  }
  canvasStartAndEndIndex(context, lineHeight) {
    let { top: pTop, bottom: pBottom } = this.view.documentPadding;
    pTop /= Scale.SizeRatio, pBottom /= Scale.SizeRatio;
    const canvasHeight = context.canvas.height;
    const { clientHeight, scrollHeight, scrollTop } = this.view.scrollDOM;
    let scrollPercent = scrollTop / (scrollHeight - clientHeight);
    if (isNaN(scrollPercent)) {
      scrollPercent = 0;
    }
    const lineCount = this.view.state.field(LinesState).length;
    const totalHeight = pTop + pBottom + lineCount * lineHeight;
    const canvasTop = Math.max(0, scrollPercent * (totalHeight - canvasHeight));
    const offsetY = Math.max(0, pTop - canvasTop);
    const startIndex = Math.round(Math.max(0, canvasTop - pTop) / lineHeight);
    const spaceForLines = Math.round((canvasHeight - offsetY) / lineHeight);
    return {
      startIndex,
      endIndex: startIndex + spaceForLines,
      offsetY
    };
  }
  updateBoxShadow() {
    if (!this.canvas) {
      return;
    }
    const { clientWidth, scrollWidth, scrollLeft } = this.view.scrollDOM;
    if (clientWidth + scrollLeft < scrollWidth) {
      this.canvas.classList.add("cm-minimap-box-shadow");
    } else {
      this.canvas.classList.remove("cm-minimap-box-shadow");
    }
  }
  destroy() {
    this.remove();
  }
}, {
  eventHandlers: {
    scroll() {
      requestAnimationFrame(() => this.render());
    }
  },
  provide: (plugin) => {
    return import_view2.EditorView.scrollMargins.of((view) => {
      var _a;
      const width = (_a = view.plugin(plugin)) == null ? void 0 : _a.getWidth();
      if (!width) {
        return null;
      }
      return { right: width };
    });
  }
});
var showMinimap = import_state3.Facet.define({
  combine: (c) => {
    var _a;
    return (_a = c.find((o) => o !== null)) != null ? _a : null;
  },
  enables: (f) => {
    return [
      [
        Config.compute([f], (s) => s.facet(f)),
        Theme2,
        LinesState,
        minimapClass,
        Overlay
      ]
    ];
  }
});

// main.ts
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerEditorExtension([
      showMinimap.compute(["doc"], (state) => {
        let create = () => {
          const dom = createEl("div");
          return { dom };
        };
        return {
          create,
          displayText: "blocks",
          showOverlay: "always",
          gutters: [{ 1: "#00FF00", 2: "#00FF00" }]
        };
      })
    ]);
  }
  onunload() {
  }
};
