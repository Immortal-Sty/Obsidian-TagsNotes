/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var d=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var k=(o,i)=>{for(var e in i)d(o,e,{get:i[e],enumerable:!0})},v=(o,i,e,t)=>{if(i&&typeof i=="object"||typeof i=="function")for(let s of p(i))!y.call(o,s)&&s!==e&&d(o,s,{get:()=>i[s],enumerable:!(t=h(i,s))||t.enumerable});return o};var g=o=>v(d({},"__esModule",{value:!0}),o);var m={};k(m,{default:()=>l});module.exports=g(m);var u=require("obsidian");var r=require("obsidian"),c={stackTabsInPopout:!0},a=class extends r.PluginSettingTab{constructor(i,e){super(i,e),this.plugin=e}display(){let{containerEl:i}=this;i.empty(),i.createEl("h2",{text:"Quick Open Settings"}),new r.Setting(i).setName("Stack Tabs in Popout Windows").setDesc("Enable or disable stacked tabs for popout windows.").addToggle(e=>e.setValue(this.plugin.settings.stackTabsInPopout).onChange(async t=>{this.plugin.settings.stackTabsInPopout=t,await this.plugin.saveSettings()}))}};var l=class extends u.Plugin{constructor(){super(...arguments);this.activeModal=null;this.results=[];this.popoutWindows=new Set;this.originalHotkeys={}}async onload(){await this.loadSettings(),this.addSettingTab(new a(this.app,this)),this.modalObserver=new MutationObserver(this.handleDOMMutation.bind(this)),this.modalObserver.observe(document.body,{childList:!0,subtree:!0}),this.resultsObserver=new MutationObserver(this.handleResultsMutation.bind(this)),this.registerEvent(this.app.workspace.on("quick-preview",this.handleQuickPreview.bind(this))),this.registerEvent(this.app.workspace.on("layout-change",this.handleLayoutChange.bind(this))),document.addEventListener("keydown",this.handleKeyPress.bind(this),!0),this.checkForActiveModal()}async loadSettings(){this.settings=Object.assign({},c,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}handleLayoutChange(){this.app.workspace.iterateAllLeaves(e=>{let t=e.view.containerEl.closest("body");if(t!=null&&t.classList.contains("is-popout-window")){let s=t.ownerDocument.defaultView;s&&this.isAppWindow(s)&&!this.popoutWindows.has(s)&&this.initializePopoutWindow(s)}})}isAppWindow(e){return"app"in e&&"workspace"in e.app}initializePopoutWindow(e){this.popoutWindows.add(e);let t=new MutationObserver(this.handleDOMMutation.bind(this));t.observe(e.document.body,{childList:!0,subtree:!0}),e.addEventListener("keydown",this.handleKeyPress.bind(this)),this.settings.stackTabsInPopout&&this.setStackedTabsForPopoutWindow(e.app.workspace),this.register(()=>{t.disconnect(),e.removeEventListener("keydown",this.handleKeyPress.bind(this)),this.popoutWindows.delete(e)})}setStackedTabsForPopoutWindow(e){let t=e;t.onLayoutReady(()=>{t.floatingSplit&&t.floatingSplit.children.forEach(s=>{s.children.forEach(n=>{n.children[0].view.getViewType()!=="outline"&&n.setStacked(!0)})})})}handleDOMMutation(e){for(let t of e)t.addedNodes.forEach(s=>{s instanceof HTMLElement&&(s.classList.contains("modal-container")||s.classList.contains("suggestion-container"))&&this.handleNewModal(s)}),t.removedNodes.forEach(s=>{s instanceof HTMLElement&&(s.classList.contains("modal-container")||s.classList.contains("suggestion-container"))&&this.handleModalClosed(s)})}handleNewModal(e){let t=e.querySelector(".suggestion, .prompt-results");t&&(this.activeModal=e,this.injectFunctionality(t),this.addModalStyles(e.ownerDocument),this.disableDefaultHotkeys())}disableDefaultHotkeys(){let e=this.app.internalPlugins.app.hotkeyManager;for(let s=1;s<9;s++){let n=`workspace:goto-tab-${s}`;this.originalHotkeys[n]=e.getDefaultHotkeys(n),e.removeDefaultHotkeys(n)}let t="workspace:goto-last-tab";this.originalHotkeys[t]=e.getDefaultHotkeys(t),e.removeDefaultHotkeys(t)}handleModalClosed(e){this.activeModal===e&&(this.activeModal=null,this.results=[],this.removeModalStyles(e.ownerDocument),this.resultsObserver.disconnect(),this.restoreDefaultHotkeys(),document.removeEventListener("keydown",this.handleKeyPress.bind(this),!0))}restoreDefaultHotkeys(){let e=this.app.internalPlugins.app.hotkeyManager;for(let[t,s]of Object.entries(this.originalHotkeys))e.addDefaultHotkeys(t,s);e.bake(),this.originalHotkeys={}}injectFunctionality(e){this.updateResults(e),this.resultsObserver.observe(e,{childList:!0,subtree:!0})}handleResultsMutation(){if(this.activeModal){let e=this.activeModal.querySelector(".suggestion, .prompt-results");e&&this.updateResults(e)}}updateResults(e){let t=e.querySelectorAll(".suggestion-item");this.results=Array.from(t).slice(0,9).map((s,n)=>({title:s.textContent||`Result ${n+1}`,element:s})),this.addModalStyles(e.ownerDocument)}handleKeyPress(e){if(this.activeModal&&(e.metaKey||e.ctrlKey)&&e.key>="1"&&e.key<="9"){let t=parseInt(e.key)-1;this.results[t]&&(e.preventDefault(),this.results[t].element.click())}}handleQuickPreview(){this.activeModal&&(this.activeModal.ownerDocument.body.classList.contains("quick-open-modal-active")||this.addModalStyles(this.activeModal.ownerDocument))}addModalStyles(e){e.body.classList.add("quick-open-modal-active")}removeModalStyles(e){e.body.classList.remove("quick-open-modal-active")}checkForActiveModal(){let e=document.querySelector(".modal-container, .suggestion-container");e instanceof HTMLElement&&this.handleNewModal(e)}onunload(){this.modalObserver.disconnect(),this.resultsObserver.disconnect(),document.removeEventListener("keydown",this.handleKeyPress),this.removeModalStyles(document),this.popoutWindows.forEach(e=>{e.removeEventListener("keydown",this.handleKeyPress),this.removeModalStyles(e.document)})}};