var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/main.ts
var import_obsidian16 = require("obsidian");

// src/settings/data.ts
var DEFAULT_SETTINGS = {
  PERSISTENCE: false,
  // 筛选
  FILTER_TAG: "",
  FILTER_GROUP: "",
  FILTER_DELAY: "",
  LANGUAGE: "zh-cn",
  CENTER: false,
  ITEM_STYLE: "alwaysExpand",
  GROUP_STYLE: "a",
  TAG_STYLE: "b",
  DELAY: false,
  FADE_OUT_DISABLED_PLUGINS: true,
  COMMAND_ITEM: false,
  COMMAND_GROUP: false,
  GROUPS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u7EC4",
      "color": "#A079FF"
    }
  ],
  TAGS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u6807\u7B7E",
      "color": "#A079FF"
    }
  ],
  DELAYS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u5EF6\u8FDF",
      "time": 10
    }
  ],
  Plugins: [],
  HIDES: []
};

// src/settings/index.ts
var import_obsidian14 = require("obsidian");

// src/settings/base-setting.ts
var BaseSetting = class {
  constructor(obj) {
    this.settingTab = obj;
    this.manager = obj.manager;
    this.settings = obj.manager.settings;
    this.containerEl = obj.contentEl;
    this.app = obj.app;
  }
  display() {
    this.main();
  }
};

// src/settings/ui/manager-basis.ts
var import_obsidian9 = require("obsidian");

// src/modal/manager-modal.ts
var path2 = __toESM(require("path"));
var import_obsidian8 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var import_fs = require("fs");
var path = __toESM(require("path"));
var managerOpen = (dir, manager) => {
  if (import_obsidian.Platform.isDesktop) {
    (0, import_child_process.exec)(`start "" "${dir}"`, (error) => {
      if (error) {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
      } else {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
      }
    });
  }
  if (import_obsidian.Platform.isMacOS) {
    (0, import_child_process.exec)(`open ${dir}`, (error) => {
      if (error) {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
      } else {
        new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
      }
    });
  }
};

// src/modal/group-modal.ts
var import_obsidian2 = require("obsidian");
var GroupModal = class extends import_obsidian2.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian2.Setting(this.titleEl).setClass("manager-bar__title").setName(`[${this.managerPlugin.name}]`);
    const closeButton = new import_obsidian2.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    for (const group of this.settings.GROUPS) {
      const itemEl = new import_obsidian2.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != group.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").onClick(() => {
            this.selected = group.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(group.id === this.managerPlugin.group).onChange(() => {
            this.managerPlugin.group = this.managerPlugin.group === group.id ? "" : group.id;
            this.manager.saveSettings();
            this.managerModal.reloadShowData();
            this.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
      if (this.selected != "" && this.selected == group.id) {
        itemEl.addColorPicker(
          (cb) => cb.setValue(group.color).onChange((value) => {
            group.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(group.name).onChange((value) => {
            group.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").onClick(() => {
            const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
            if (!hasTestGroup) {
              this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = "";
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
          if (!containsId && id !== "") {
            if (color === "")
              color = "#000000";
            this.manager.settings.GROUPS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian2.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/tags-modal.ts
var import_obsidian3 = require("obsidian");
var TagsModal = class extends import_obsidian3.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian3.Setting(this.titleEl).setClass("manager-bar__title").setName(this.managerPlugin.name);
    const closeButton = new import_obsidian3.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    for (const tag of this.settings.TAGS) {
      const itemEl = new import_obsidian3.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != tag.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").onClick(() => {
            this.selected = tag.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(this.managerPlugin.tags.includes(tag.id)).onChange((isChecked) => {
            if (isChecked) {
              if (!this.managerPlugin.tags.includes(tag.id)) {
                this.managerPlugin.tags.push(tag.id);
              }
            } else {
              this.managerPlugin.tags = this.managerPlugin.tags.filter((t) => t !== tag.id);
            }
            this.manager.saveSettings();
            this.managerModal.reloadShowData();
          })
        );
        const tempEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(tempEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        tempEl.appendChild(tagEl);
      }
      if (this.selected != "" && this.selected == tag.id) {
        itemEl.addColorPicker(
          (cb) => cb.setValue(tag.color).onChange((value) => {
            tag.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(tag.name).onChange((value) => {
            tag.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").onClick(() => {
            const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
            if (!hasTestTag) {
              this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        groupEl.appendChild(tagEl);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = "";
      const foodBar = new import_obsidian3.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
          if (!containsId && id !== "") {
            if (color === "")
              color = "#000000";
            this.manager.settings.TAGS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian3.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian3.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian3.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/delete-modal.ts
var import_obsidian4 = require("obsidian");
var DeleteModal = class extends import_obsidian4.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian4.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u6807\u9898"));
    const closeButton = new import_obsidian4.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian4.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u63D0\u793A"));
    const actionBar = new import_obsidian4.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setWarning().setButtonText(this.manager.translator.t("\u5378\u8F7D_\u5378\u8F7D")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u5378\u8F7D_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/disable-modal.ts
var import_obsidian5 = require("obsidian");
var DisableModal = class extends import_obsidian5.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u6807\u9898"));
    const closeButton = new import_obsidian5.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u63D0\u793A"));
    const actionBar = new import_obsidian5.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setCta().setButtonText(this.manager.translator.t("\u4E00\u952E_\u542F\u7981")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u4E00\u952E_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/note-modal.ts
var import_obsidian6 = require("obsidian");
var NoteModal = class extends import_obsidian6.Modal {
  constructor(app, manager, managerPlugin, managerModal) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerPlugin = managerPlugin;
    this.managerModal = managerModal;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-note__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian6.Setting(this.titleEl).setClass("manager-bar__title").setName(`${this.managerPlugin.name}`);
    const closeButton = new import_obsidian6.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const textArea = new import_obsidian6.TextAreaComponent(this.contentEl);
    textArea.setValue(this.managerPlugin.note);
    textArea.onChange((newValue) => {
      this.managerPlugin.note = newValue;
      this.manager.saveSettings();
      this.managerModal.reloadShowData();
    });
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/hide-modal.ts
var import_obsidian7 = require("obsidian");
var HideModal = class extends import_obsidian7.Modal {
  constructor(app, manager, managerModal, plugins) {
    super(app);
    // [本地][变量] 导出插件列表
    this.plugins = [];
    // 搜索内容
    this.searchText = "";
    this.delay = "";
    this.tag = "";
    this.group = "";
    this.filter = "all";
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.managerModal = managerModal;
    this.settings = manager.settings;
    this.plugins = plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const actionBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__action").setName("\u9690\u85CF\u63D2\u4EF6");
    const closeButton = new import_obsidian7.ButtonComponent(actionBar.controlEl);
    closeButton.setIcon("x");
    closeButton.onClick(() => {
      this.close();
    });
    const searchBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter);
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(this.group);
    groupsDropdown.onChange((value) => {
      this.group = value;
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(this.tag);
    tagsDropdown.onChange((value) => {
      this.tag = value;
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
      const delaysDropdown = new import_obsidian7.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(this.delay || "");
      delaysDropdown.onChange((value) => {
        this.delay = value;
        this.reloadShowData();
      });
    }
    this.searchEl = new import_obsidian7.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    for (const plugin of this.plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        switch (this.filter) {
          case "enabled":
            if (!isEnabled)
              continue;
            break;
          case "disabled":
            if (isEnabled)
              continue;
            break;
          case "grouped":
            if (ManagerPlugin.group === "")
              continue;
            break;
          case "ungrouped":
            if (ManagerPlugin.group !== "")
              continue;
            break;
          case "tagged":
            if (ManagerPlugin.tags.length === 0)
              continue;
            break;
          case "untagged":
            if (ManagerPlugin.tags.length > 0)
              continue;
            break;
          case "noted":
            if (!ManagerPlugin.note || ManagerPlugin.note === "")
              continue;
            break;
          default:
            break;
        }
        if (this.group !== "" && ManagerPlugin.group !== this.group)
          continue;
        if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
          continue;
        if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
          continue;
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian7.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        if (ManagerPlugin.group !== "") {
          const group = createSpan({ cls: "manager-item__name-group" });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
            group.appendChild(tag);
          }
        }
        const title = createSpan({ text: ManagerPlugin.name, cls: "manager-item__name-title" });
        itemEl.nameEl.appendChild(title);
        const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
        itemEl.nameEl.appendChild(version);
        if (this.settings.DELAY && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({ text: ManagerPlugin.desc, cls: ["manager-item__name-desc"] });
        itemEl.descEl.appendChild(desc);
        const tags = createDiv();
        itemEl.descEl.appendChild(tags);
        ManagerPlugin.tags.map((id) => {
          const item = this.settings.TAGS.find((item2) => item2.id === id);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            tags.appendChild(tag);
          }
        });
        const hiddenToggle = new import_obsidian7.ToggleComponent(itemEl.controlEl);
        const isHidden = this.settings.HIDES.includes(plugin.id);
        hiddenToggle.setValue(isHidden);
        hiddenToggle.onChange((value) => {
          if (value)
            this.settings.HIDES.push(plugin.id);
          else
            this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
          this.manager.saveSettings();
          this.managerModal.reloadShowData();
        });
      }
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/manager-modal.ts
var ManagerModal = class extends import_obsidian8.Modal {
  constructor(app, manager) {
    super(app);
    // [本地][变量] 展示插件列表
    this.displayPlugins = [];
    this.allPlugins = [];
    // 过滤器
    this.filter = "";
    // 分组内容
    this.group = "";
    // 标签内容
    this.tag = "";
    // 标签内容
    this.delay = "";
    // 搜索内容
    this.searchText = "";
    // 编辑模式
    this.editorMode = false;
    // 测试模式
    this.developerMode = false;
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.settings = manager.settings;
    this.basePath = path2.normalize(this.app.vault.adapter.getBasePath());
    manager.synchronizePlugins(
      Object.values(this.appPlugins.manifests).filter(
        (pm) => pm.id !== manager.manifest.id
      )
    );
  }
  async getActivePlugins() {
    const originPlugins = this.app.plugins.plugins;
    console.log(await this.processPlugins(originPlugins));
    return await this.processPlugins(originPlugins);
  }
  async processPlugins(originPlugins) {
    var _a;
    let plugins = {};
    for (let name in originPlugins) {
      try {
        let plugin = { ...originPlugins[name] };
        plugin.manifest = { ...originPlugins[name].manifest };
        plugin.manifest["pluginUrl"] = `https://obsidian.md/plugins?id=${plugin.manifest.id}`;
        plugin.manifest["author2"] = (_a = plugin.manifest.author) == null ? void 0 : _a.replace(/<.*?@.*?\..*?>/g, "").trim();
        plugin.manifest["installLink"] = `obsidian://BPM-install?id=${plugin.manifest.id}&enable=true`;
        plugins[name] = plugin;
      } catch (e) {
        console.error(name, e);
        console.log(originPlugins[name]);
        console.log(originPlugins[name].manifest);
        console.log(typeof originPlugins[name].manifest);
      }
    }
    return plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    this.footEl = document.createElement("div");
    this.footEl.addClass("manager-food");
    this.modalEl.appendChild(this.footEl);
    const actionBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__action").setName(this.manager.translator.t("\u901A\u7528_\u64CD\u4F5C_\u6587\u672C"));
    const githubButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    githubButton.setIcon("github");
    githubButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0"));
    githubButton.onClick(() => {
      window.open(this.manager.manifest.authorUrl);
    });
    const tutorialButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    tutorialButton.setIcon("book-open");
    tutorialButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0"));
    tutorialButton.onClick(() => {
      window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
    });
    const updateButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    updateButton.setIcon("rss");
    updateButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    updateButton.onClick(async () => {
      try {
        const result = await this.appPlugins.checkForUpdates();
        this.appSetting.open();
        this.appSetting.openTabById("community-plugins");
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u65F6\u51FA\u9519:", error);
      }
    });
    const hideButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    hideButton.setIcon("eye-off");
    hideButton.onClick(async () => {
      const plugins = Object.values(this.appPlugins.manifests);
      plugins.sort((item1, item2) => {
        return item1.name.localeCompare(item2.name);
      });
      new HideModal(this.app, this.manager, this, plugins).open();
    });
    const reloadButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    reloadButton.setIcon("refresh-ccw");
    reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0"));
    reloadButton.onClick(async () => {
      new import_obsidian8.Notice("\u91CD\u65B0\u52A0\u8F7D\u7B2C\u4E09\u65B9\u63D2\u4EF6");
      await this.appPlugins.loadManifests();
      this.reloadShowData();
    });
    const disableButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    disableButton.setIcon("square");
    disableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0"));
    disableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
            if (ManagerPlugin && ManagerPlugin.enabled) {
              await this.appPlugins.disablePlugin(plugin.id);
              ManagerPlugin.enabled = false;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.disablePluginAndSave(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const enableButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    enableButton.setIcon("square-check");
    enableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0"));
    enableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (this.settings.DELAY) {
            const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
            if (ManagerPlugin && !ManagerPlugin.enabled) {
              await this.appPlugins.enablePlugin(plugin.id);
              ManagerPlugin.enabled = true;
              this.manager.saveSettings();
              this.reloadShowData();
            }
          } else {
            if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
              await this.appPlugins.enablePluginAndSave(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const editorButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
    editorButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    editorButton.onClick(() => {
      this.editorMode = !this.editorMode;
      this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
      this.reloadShowData();
    });
    const settingsButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    settingsButton.setIcon("settings");
    settingsButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"));
    settingsButton.onClick(() => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
    });
    if (this.developerMode) {
      const testButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("refresh-ccw");
      testButton.setTooltip("\u5237\u65B0\u63D2\u4EF6");
      testButton.onClick(async () => {
        this.close();
        await this.appPlugins.disablePlugin(this.manager.manifest.id);
        await this.appPlugins.enablePlugin(this.manager.manifest.id);
      });
    }
    if (this.developerMode) {
      const testButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("test-tube");
      testButton.setTooltip("\u6D4B\u8BD5\u63D2\u4EF6");
      testButton.onClick(async () => {
      });
    }
    const searchBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter || "all");
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group);
    groupsDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_GROUP = value;
        this.manager.saveSettings();
      } else {
        this.group = value;
      }
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag);
    tagsDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_TAG = value;
        this.manager.saveSettings();
      } else {
        this.tag = value;
      }
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
      const delaysDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay);
      delaysDropdown.onChange((value) => {
        if (this.settings.PERSISTENCE) {
          this.settings.FILTER_DELAY = value;
          this.manager.saveSettings();
        } else {
          this.delay = value;
        }
        this.reloadShowData();
      });
    }
    this.searchEl = new import_obsidian8.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    var _a;
    const plugins = Object.values(this.appPlugins.manifests);
    plugins.sort((item1, item2) => {
      return item1.name.localeCompare(item2.name);
    });
    this.displayPlugins = [];
    for (const plugin of plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const pluginDir = path2.join(this.basePath, plugin.dir ? plugin.dir : "");
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        switch (this.filter) {
          case "enabled":
            if (!isEnabled)
              continue;
            break;
          case "disabled":
            if (isEnabled)
              continue;
            break;
          case "grouped":
            if (ManagerPlugin.group === "")
              continue;
            break;
          case "ungrouped":
            if (ManagerPlugin.group !== "")
              continue;
            break;
          case "tagged":
            if (ManagerPlugin.tags.length === 0)
              continue;
            break;
          case "untagged":
            if (ManagerPlugin.tags.length > 0)
              continue;
            break;
          case "noted":
            if (!ManagerPlugin.note || ManagerPlugin.note === "")
              continue;
            break;
          default:
            break;
        }
        if (this.settings.PERSISTENCE) {
          if (this.settings.FILTER_GROUP !== "" && ManagerPlugin.group !== this.settings.FILTER_GROUP)
            continue;
          if (this.settings.FILTER_TAG !== "" && !ManagerPlugin.tags.includes(this.settings.FILTER_TAG))
            continue;
          if (this.settings.FILTER_DELAY !== "" && ManagerPlugin.delay !== this.settings.FILTER_DELAY)
            continue;
        } else {
          if (this.group !== "" && ManagerPlugin.group !== this.group)
            continue;
          if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
            continue;
          if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
            continue;
        }
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (this.settings.HIDES.includes(plugin.id))
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian8.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        itemEl.settingEl.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          const menu = new import_obsidian8.Menu();
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_GitHub_\u6807\u9898")).setIcon("github").onClick(() => {
              window.open(`obsidian://BPM-plugin-github?id=${plugin.id}`);
            })
          );
          menu.addSeparator();
          if (!this.settings.DELAY)
            menu.addItem(
              (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0")).setIcon("repeat-1").setDisabled(isEnabled).onClick(async () => {
                new import_obsidian8.Notice("\u5F00\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49");
                await this.appPlugins.enablePlugin(plugin.id);
                await this.reloadShowData();
              })
            );
          if (!this.settings.DELAY)
            menu.addItem(
              (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("refresh-ccw").setDisabled(!isEnabled).onClick(async () => {
                new import_obsidian8.Notice("\u91CD\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49");
                await this.appPlugins.disablePluginAndSave(plugin.id);
                await this.appPlugins.enablePluginAndSave(plugin.id);
                await this.reloadShowData();
              })
            );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898")).setIcon("eye-off").onClick(() => {
              const isHidden = this.settings.HIDES.includes(plugin.id);
              if (isHidden) {
                this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
              } else {
                this.settings.HIDES.push(plugin.id);
              }
              this.manager.saveSettings();
              this.reloadShowData();
            })
          );
          menu.addSeparator();
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u7B14\u8BB0_\u6807\u9898")).setIcon("notebook-pen").onClick(() => {
              new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
            })
          );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898")).setIcon("circle-plus").onClick(async () => {
              await this.appSetting.open();
              await this.appSetting.openTabById("hotkeys");
              const tab = await this.appSetting.activeTab;
              tab.searchComponent.inputEl.value = plugin.id;
              tab.updateHotkeyVisibility();
              tab.searchComponent.inputEl.blur();
            })
          );
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u590D\u5236ID_\u6807\u9898")).setIcon("copy").onClick(() => {
              navigator.clipboard.writeText(plugin.id);
              new import_obsidian8.Notice(this.manager.translator.t("\u901A\u77E5_ID\u5DF2\u590D\u5236"));
            })
          );
          menu.showAtPosition({ x: event.clientX, y: event.clientY });
        });
        if (this.settings.FADE_OUT_DISABLED_PLUGINS && !isEnabled)
          itemEl.settingEl.addClass("inactive");
        this.displayPlugins.push(plugin);
        if (!this.editorMode) {
          switch (this.settings.ITEM_STYLE) {
            case "alwaysExpand":
              itemEl.descEl.addClass("manager-display-block");
              break;
            case "neverExpand":
              itemEl.descEl.addClass("manager-display-none");
              break;
            case "hoverExpand":
              itemEl.descEl.addClass("manager-display-none");
              itemEl.settingEl.addEventListener(
                "mouseenter",
                () => {
                  itemEl.descEl.removeClass("manager-display-none");
                  itemEl.descEl.addClass("manager-display-block");
                }
              );
              itemEl.settingEl.addEventListener(
                "mouseleave",
                () => {
                  itemEl.descEl.removeClass("manager-display-block");
                  itemEl.descEl.addClass("manager-display-none");
                }
              );
              break;
            case "clickExpand":
              itemEl.descEl.addClass("manager-display-none");
              itemEl.settingEl.addEventListener(
                "click",
                function(event) {
                  const excludedButtons = Array.from(
                    itemEl.controlEl.querySelectorAll("div")
                  );
                  if (
                    // @ts-ignore
                    excludedButtons.includes(event.target)
                  ) {
                    event.stopPropagation();
                    return;
                  }
                  if (itemEl.descEl.hasClass("manager-display-none")) {
                    itemEl.descEl.removeClass("manager-display-none");
                    itemEl.descEl.addClass("manager-display-block");
                  } else {
                    itemEl.descEl.removeClass("manager-display-block");
                    itemEl.descEl.addClass("manager-display-none");
                  }
                }
              );
              break;
          }
        }
        if (ManagerPlugin.group !== "") {
          const group = createSpan({ cls: "manager-item__name-group" });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
            if (this.editorMode)
              tag.onclick = () => {
                new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
              };
            group.appendChild(tag);
          }
        }
        if (ManagerPlugin.group === "" && this.editorMode) {
          const group = createSpan({ cls: "manager-item__name-group" });
          if (this.editorMode)
            itemEl.nameEl.appendChild(group);
          const tag = this.manager.createTag("+", "", "");
          if (this.editorMode)
            tag.onclick = () => {
              new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
            };
          if (this.editorMode)
            group.appendChild(tag);
        }
        const title = createSpan({ text: ManagerPlugin.name, title: plugin.name, cls: "manager-item__name-title" });
        if (this.editorMode) {
          title.setAttribute("style", "border-width: 1px;border-style: dashed;");
          title.setAttribute("contenteditable", "true");
          title.addEventListener("input", () => {
            if (title.textContent) {
              ManagerPlugin.name = title.textContent;
              this.manager.saveSettings();
              command_default(this.app, this.manager);
            }
          });
        }
        itemEl.nameEl.appendChild(title);
        const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
        itemEl.nameEl.appendChild(version);
        if (((_a = ManagerPlugin.note) == null ? void 0 : _a.length) > 0) {
          const note = createSpan();
          note.style.cssText = "width:16px; height:16px; display:inline-flex; color: var(--text-accent);";
          note.addEventListener("click", () => {
            new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
          });
          itemEl.nameEl.appendChild(note);
          (0, import_obsidian8.setIcon)(note, "notebook-pen");
        }
        if (this.settings.DELAY && !this.editorMode && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({ text: ManagerPlugin.desc, title: plugin.description, cls: ["manager-item__name-desc"] });
        if (this.editorMode) {
          desc.setAttribute("style", "border-width: 1px;border-style: dashed");
          desc.setAttribute("contenteditable", "true");
          desc.addEventListener("input", () => {
            if (desc.textContent) {
              ManagerPlugin.desc = desc.textContent;
              this.manager.saveSettings();
            }
          });
        }
        itemEl.descEl.appendChild(desc);
        const tags = createDiv();
        itemEl.descEl.appendChild(tags);
        ManagerPlugin.tags.map((id) => {
          const item = this.settings.TAGS.find((item2) => item2.id === id);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            if (this.editorMode)
              tag.onclick = () => {
                new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
              };
            tags.appendChild(tag);
          }
        });
        if (this.editorMode) {
          const tag = this.manager.createTag("+", "", "");
          tag.onclick = () => {
            new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
          };
          tags.appendChild(tag);
        }
        if (!this.editorMode) {
          if (isEnabled) {
            const openPluginSetting = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
            openPluginSetting.setIcon("settings");
            openPluginSetting.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0"));
            openPluginSetting.onClick(() => {
              openPluginSetting.setDisabled(true);
              this.appSetting.open();
              this.appSetting.openTabById(plugin.id);
              openPluginSetting.setDisabled(false);
            });
          }
          const openPluginDirButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          openPluginDirButton.setIcon("folder-open");
          openPluginDirButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0"));
          openPluginDirButton.onClick(() => {
            openPluginDirButton.setDisabled(true);
            managerOpen(pluginDir, this.manager);
            openPluginDirButton.setDisabled(false);
          });
          const deletePluginButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          deletePluginButton.setIcon("trash");
          deletePluginButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0"));
          deletePluginButton.onClick(async () => {
            new DeleteModal(this.app, this.manager, async () => {
              await this.appPlugins.uninstallPlugin(plugin.id);
              await this.appPlugins.loadManifests();
              this.reloadShowData();
              command_default(this.app, this.manager);
              this.manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manager.manifest.id));
              new import_obsidian8.Notice(this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00"));
            }).open();
          });
          const toggleSwitch = new import_obsidian8.ToggleComponent(itemEl.controlEl);
          toggleSwitch.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0"));
          toggleSwitch.setValue(isEnabled);
          toggleSwitch.onChange(async () => {
            if (this.settings.DELAY) {
              if (toggleSwitch.getValue()) {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.removeClass("inactive");
                ManagerPlugin.enabled = true;
                this.manager.saveSettings();
                await this.appPlugins.enablePlugin(plugin.id);
              } else {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.addClass("inactive");
                ManagerPlugin.enabled = false;
                this.manager.saveSettings();
                await this.appPlugins.disablePlugin(plugin.id);
              }
            } else {
              if (toggleSwitch.getValue()) {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.removeClass("inactive");
                await this.appPlugins.enablePluginAndSave(plugin.id);
              } else {
                if (this.settings.FADE_OUT_DISABLED_PLUGINS)
                  itemEl.settingEl.addClass("inactive");
                await this.appPlugins.disablePluginAndSave(plugin.id);
              }
            }
            command_default(this.app, this.manager);
            this.reloadShowData();
          });
        }
        if (this.editorMode) {
          const reloadButton = new import_obsidian8.ExtraButtonComponent(itemEl.controlEl);
          reloadButton.setIcon("refresh-ccw");
          reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0"));
          reloadButton.onClick(() => {
            ManagerPlugin.name = plugin.name;
            ManagerPlugin.desc = plugin.description;
            ManagerPlugin.group = "";
            ManagerPlugin.delay = "";
            ManagerPlugin.tags = [];
            this.manager.saveSettings();
            this.reloadShowData();
          });
          if (this.settings.DELAY) {
            const delays = this.settings.DELAYS.reduce((acc, item) => {
              acc[item.id] = item.name;
              return acc;
            }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
            const delaysEl = new import_obsidian8.DropdownComponent(itemEl.controlEl);
            delaysEl.addOptions(delays);
            delaysEl.setValue(ManagerPlugin.delay);
            delaysEl.onChange((value) => {
              ManagerPlugin.delay = value;
              this.manager.saveSettings();
              this.reloadShowData();
            });
          }
        }
      }
    }
    this.footEl.innerHTML = this.count();
  }
  count() {
    let totalCount = 0;
    let enabledCount = 0;
    let disabledCount = 0;
    if (this.settings.DELAY) {
      const plugins = this.settings.Plugins;
      totalCount = plugins.length;
      plugins.forEach((plugin) => {
        plugin.enabled ? enabledCount++ : disabledCount++;
      });
    } else {
      totalCount = Object.keys(this.manager.appPlugins.manifests).length - 1;
      enabledCount = this.manager.appPlugins.enabledPlugins.size - 1;
      disabledCount = totalCount - enabledCount;
    }
    const summary = `[${this.manager.translator.t(
      "\u901A\u7528_\u603B\u8BA1_\u6587\u672C"
    )}] ${totalCount} [${this.manager.translator.t(
      "\u901A\u7528_\u542F\u7528_\u6587\u672C"
    )}] ${enabledCount} [${this.manager.translator.t(
      "\u901A\u7528_\u7981\u7528_\u6587\u672C"
    )}] ${disabledCount} `;
    return summary;
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
    this.searchEl.inputEl.focus();
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        if (this.searchEl.inputEl) {
          this.searchEl.inputEl.focus();
        }
      }
    });
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/command.ts
var Commands = (app, manager) => {
  manager.addCommand({
    id: "manager-view",
    name: manager.translator.t("\u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0"),
    hotkeys: [
      {
        modifiers: ["Ctrl"],
        key: "M"
      }
    ],
    callback: () => {
      new ManagerModal(app, manager).open();
    }
  });
  if (manager.settings.DELAY) {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const mp = manager.settings.Plugins.find((mp2) => mp2.id === plugin.id);
        if (mp) {
          manager.addCommand({
            id: `manager-${mp.id}`,
            name: `${mp.enabled ? manager.translator.t("\u901A\u7528_\u5173\u95ED_\u6587\u672C") : manager.translator.t("\u901A\u7528_\u5F00\u542F_\u6587\u672C")} ${mp.name} `,
            callback: async () => {
              if (mp.enabled) {
                mp.enabled = false;
                manager.saveSettings();
                await manager.appPlugins.disablePlugin(plugin.id);
                Commands(app, manager);
              } else {
                mp.enabled = true;
                manager.saveSettings();
                await manager.appPlugins.enablePlugin(plugin.id);
                Commands(app, manager);
              }
            }
          });
        }
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && !plugin.enabled) {
                await manager.appPlugins.enablePlugin(plugin.id);
                plugin.enabled = true;
                manager.saveSettings();
              }
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && plugin.enabled) {
                await manager.appPlugins.disablePlugin(plugin.id);
                plugin.enabled = false;
                manager.saveSettings();
              }
            });
            Commands(app, manager);
          }
        });
      });
    }
  } else {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const enabled = manager.appPlugins.enabledPlugins.has(plugin.id);
        manager.addCommand({
          id: `manager-${plugin.id}`,
          name: `${enabled ? manager.translator.t("\u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C") : manager.translator.t("\u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C")} ${plugin.name} `,
          callback: async () => {
            if (enabled) {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
              Commands(app, manager);
            } else {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
              Commands(app, manager);
            }
          }
        });
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
            });
            Commands(app, manager);
          }
        });
      });
    }
  }
};
var command_default = Commands;

// src/settings/ui/manager-basis.ts
var ManagerBasis = class extends BaseSetting {
  main() {
    const languageBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0"));
    const languageDropdown = new import_obsidian9.DropdownComponent(languageBar.controlEl);
    languageDropdown.addOptions(this.manager.translator.language);
    languageDropdown.setValue(this.settings.LANGUAGE);
    languageDropdown.onChange((value) => {
      this.settings.LANGUAGE = value;
      this.manager.saveSettings();
      this.settingTab.basisDisplay();
      command_default(this.app, this.manager);
      this.settingTab.display();
      this.display();
    });
    const DelayBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0"));
    const DelayToggle = new import_obsidian9.ToggleComponent(DelayBar.controlEl);
    DelayToggle.setValue(this.settings.DELAY);
    DelayToggle.onChange((value) => {
      this.settings.DELAY = value;
      this.manager.saveSettings();
      value ? this.manager.enableDelaysForAllPlugins() : this.manager.disableDelaysForAllPlugins();
      this.settingTab.display();
      this.display();
    });
    const persistenceBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0"));
    const persistenceToggle = new import_obsidian9.ToggleComponent(persistenceBar.controlEl);
    persistenceToggle.setValue(this.settings.PERSISTENCE);
    persistenceToggle.onChange((value) => {
      this.settings.PERSISTENCE = value;
      this.manager.saveSettings();
    });
    const CommandItemBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandItemToggle = new import_obsidian9.ToggleComponent(CommandItemBar.controlEl);
    CommandItemToggle.setValue(this.settings.COMMAND_ITEM);
    CommandItemToggle.onChange((value) => {
      this.settings.COMMAND_ITEM = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const CommandGroupBar = new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandGroupToggle = new import_obsidian9.ToggleComponent(CommandGroupBar.controlEl);
    CommandGroupToggle.setValue(this.settings.COMMAND_GROUP);
    CommandGroupToggle.onChange((value) => {
      this.settings.COMMAND_GROUP = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    new import_obsidian9.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0"));
  }
};

// src/settings/ui/manager-style.ts
var import_obsidian10 = require("obsidian");
var ManagerBasis2 = class extends BaseSetting {
  constructor() {
    super(...arguments);
    this.ITEM_STYLE = {
      "alwaysExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "neverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "hoverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "clickExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.GROUP_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.TAG_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
  }
  main() {
    const itemStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0"));
    const itemStyleDropdown = new import_obsidian10.DropdownComponent(itemStyleBar.controlEl);
    itemStyleDropdown.addOptions(this.ITEM_STYLE);
    itemStyleDropdown.setValue(this.settings.ITEM_STYLE);
    itemStyleDropdown.onChange((value) => {
      this.settings.ITEM_STYLE = value;
      this.manager.saveSettings();
    });
    const groupStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0"));
    const groupStyleDropdown = new import_obsidian10.DropdownComponent(groupStyleBar.controlEl);
    groupStyleDropdown.addOptions(this.GROUP_STYLE);
    groupStyleDropdown.setValue(this.settings.GROUP_STYLE);
    groupStyleDropdown.onChange((value) => {
      this.settings.GROUP_STYLE = value;
      this.manager.saveSettings();
    });
    const tagStyleBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0"));
    const tagStyleDropdown = new import_obsidian10.DropdownComponent(tagStyleBar.controlEl);
    tagStyleDropdown.addOptions(this.TAG_STYLE);
    tagStyleDropdown.setValue(this.settings.TAG_STYLE);
    tagStyleDropdown.onChange((value) => {
      this.settings.TAG_STYLE = value;
      this.manager.saveSettings();
    });
    const topBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0"));
    const topToggle = new import_obsidian10.ToggleComponent(topBar.controlEl);
    topToggle.setValue(this.settings.CENTER);
    topToggle.onChange((value) => {
      this.settings.CENTER = value;
      this.manager.saveSettings();
    });
    const fadeOutDisabledPluginsBar = new import_obsidian10.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0"));
    const fadeOutDisabledPluginsToggle = new import_obsidian10.ToggleComponent(fadeOutDisabledPluginsBar.controlEl);
    fadeOutDisabledPluginsToggle.setValue(this.settings.FADE_OUT_DISABLED_PLUGINS);
    fadeOutDisabledPluginsToggle.onChange((value) => {
      this.settings.FADE_OUT_DISABLED_PLUGINS = value;
      this.manager.saveSettings();
    });
  }
};

// src/settings/ui/manager-delay.ts
var import_obsidian11 = require("obsidian");
var ManagerDelay = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let time = 0;
    new import_obsidian11.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addSlider(
      (cb) => cb.setLimits(0, 100, 1).setValue(time).setDynamicTooltip().onChange((value) => {
        time = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.DELAYS.some((delay) => delay.id === id);
        if (!containsId && id !== "") {
          this.manager.settings.DELAYS.push({ id, name, time });
          this.manager.saveSettings();
          this.settingTab.delayDisplay();
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.DELAYS.forEach((delay, index) => {
      const item = new import_obsidian11.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.setName(`[${delay.id}]`);
      item.addSlider(
        (cb) => cb.setLimits(0, 100, 1).setValue(delay.time).setDynamicTooltip().onChange((value) => {
          delay.time = value;
          this.manager.saveSettings();
        })
      );
      item.addText(
        (cb) => cb.setValue(delay.name).onChange((value) => {
          delay.name = value;
          this.manager.saveSettings();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.delay === delay.id);
          if (!hasTestGroup) {
            this.manager.settings.DELAYS = this.manager.settings.DELAYS.filter((t) => t.id !== delay.id);
            this.manager.saveSettings();
            this.settingTab.delayDisplay();
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian11.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
    });
  }
};

// src/settings/ui/manager-tag.ts
var import_obsidian12 = require("obsidian");
var ManagerTag = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian12.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = "#000000";
          this.manager.settings.TAGS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
          new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.TAGS.forEach((tag, index) => {
      const item = new import_obsidian12.Setting(this.containerEl);
      item.setClass("manager-setting-tag__item");
      item.addColorPicker(
        (cb) => cb.setValue(tag.color).onChange((value) => {
          tag.color = value;
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
        })
      );
      item.addText(
        (cb) => cb.setValue(tag.name).onChange((value) => {
          tag.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.tagDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
          if (!hasTestTag) {
            this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
            this.manager.saveSettings();
            this.settingTab.tagDisplay();
            new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian12.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${tag.id}]`);
    });
  }
};

// src/settings/ui/manager-group.ts
var import_obsidian13 = require("obsidian");
var ManagerGroup = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = "";
    new import_obsidian13.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = "#000000";
          this.manager.settings.GROUPS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
          command_default(this.app, this.manager);
          new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.GROUPS.forEach((group, index) => {
      const item = new import_obsidian13.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.addColorPicker(
        (cb) => cb.setValue(group.color).onChange((value) => {
          group.color = value;
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
        })
      );
      item.addText(
        (cb) => cb.setValue(group.name).onChange((value) => {
          group.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.groupDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
          if (!hasTestGroup) {
            this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
            this.manager.saveSettings();
            this.settingTab.groupDisplay();
            command_default(this.app, this.manager);
            new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian13.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${group.id}]`);
    });
  }
};

// src/settings/index.ts
var ManagerSettingTab = class extends import_obsidian14.PluginSettingTab {
  constructor(app, manager) {
    super(app, manager);
    this.manager = manager;
    this.app = app;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("manager-setting__container");
    const tabsEl = this.containerEl.createEl("div");
    tabsEl.addClass("manager-setting__tabs");
    this.contentEl = this.containerEl.createEl("div");
    this.contentEl.addClass("manager-setting__content");
    const tabItems = [
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.basisDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.styleDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.groupDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.tagDisplay() }
    ];
    if (this.manager.settings.DELAY)
      tabItems.push({ text: this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.delayDisplay() });
    const tabItemsEls = [];
    tabItems.forEach((item, index) => {
      const itemEl = tabsEl.createEl("div");
      itemEl.addClass("manager-setting__tabs-item");
      itemEl.textContent = item.text;
      tabItemsEls.push(itemEl);
      if (index === 0) {
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      }
      itemEl.addEventListener("click", () => {
        tabItemsEls.forEach((tabEl) => {
          tabEl.removeClass("manager-setting__tabs-item_is-active");
        });
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      });
    });
  }
  basisDisplay() {
    this.contentEl.empty();
    new ManagerBasis(this).display();
  }
  styleDisplay() {
    this.contentEl.empty();
    new ManagerBasis2(this).display();
  }
  delayDisplay() {
    this.contentEl.empty();
    new ManagerDelay(this).display();
  }
  groupDisplay() {
    this.contentEl.empty();
    new ManagerGroup(this).display();
  }
  tagDisplay() {
    this.contentEl.empty();
    new ManagerTag(this).display();
  }
};

// src/lang/locale/zh_cn.ts
var zh_cn_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u63D2\u4EF6\u7BA1\u7406\u5668",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u8D25",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u65B0\u589E",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u641C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u79F0",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u65E0",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u603B\u8BA1",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "\u5173\u95ED",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "\u5F00\u542F",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "\u5206\u7EC4",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "\u4E00\u952E\u542F\u7528",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "\u4E00\u952E\u7981\u7528",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u8BBF\u95EE\u4F5C\u8005\u7684GitHub\u9875\u9762\uFF0C\u67E5\u770B\u9879\u76EE\u8BE6\u60C5\u3001\u66F4\u65B0\u65E5\u5FD7\u3001\u53C2\u4E0E\u8BA8\u8BBA\u548C\u8D21\u732E\u4EE3\u7801\u3002",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u8BBF\u95EE\u89C6\u9891\u6559\u7A0B",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u542F\u7528\u7F16\u8F91\u6A21\u5F0F\uFF0C\u6DF1\u5EA6\u81EA\u5B9A\u4E49\u63D2\u4EF6\u914D\u7F6E",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u8F7D\u63D2\u4EF6\uFF0C\u5373\u65F6\u751F\u6548",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u68C0\u67E5\u63D2\u4EF6\u66F4\u65B0",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u952E\u7981\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u952E\u542F\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u7BA1\u7406\u63D2\u4EF6\u8BBE\u7F6E",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u663E\u793A\u5DF2\u542F\u7528\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u7B5B\u9009\u6240\u6709\u672A\u5206\u7EC4\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u6253\u5F00\u8BBE\u7F6E\u754C\u9762",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u8FD8\u539F\u521D\u59CB\u72B6\u6001",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u6253\u5F00\u63D2\u4EF6\u76EE\u5F55",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u5F7B\u5E95\u5220\u9664\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u5207\u6362\u63D2\u4EF6\u72B6\u6001",
  \u5378\u8F7D_\u6807\u9898: "\u5378\u8F7D\u63D2\u4EF6",
  \u5378\u8F7D_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u5378\u8F7D\u6B64\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u5220\u9664\u63D2\u4EF6\u7684\u6587\u4EF6\u5939\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u5378\u8F7D",
  \u5378\u8F7D_\u53D6\u6D88: "\u53D6\u6D88",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u5378\u8F7D\u6210\u529F",
  \u4E00\u952E_\u6807\u9898: "\u4E00\u952E\u542F\u7528/\u7981\u7528\u63D2\u4EF6",
  \u4E00\u952E_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u4E00\u952E\u542F\u7528/\u7981\u7528\u6B64\u9875\u9762\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u65E0\u6CD5\u6062\u590D\u3002(\u542F\u7528/\u7981\u7528\u8FC7\u7A0B\u4E2D\u8BF7\u8010\u5FC3\u7B49\u5F85)",
  \u4E00\u952E_\u542F\u7981: "\u542F\u7528/\u7981\u7528",
  \u4E00\u952E_\u53D6\u6D88: "\u53D6\u6D88",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "\u542F\u7528/\u7981\u7528\u6210\u529F",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "\u7B14\u8BB0",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "\u5FEB\u6377\u952E",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "\u5355\u6B21\u542F\u52A8",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u542F\u63D2\u4EF6",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\u9690\u85CF\u63D2\u4EF6",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "\u590D\u5236ID",
  \u901A\u77E5_ID\u5DF2\u590D\u5236: "ID\u5DF2\u590D\u5236",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "\u5168\u90E8",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u542F\u7528",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "\u4EC5\u7981\u7528",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "\u5DF2\u5206\u7EC4",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u672A\u5206\u7EC4",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "\u6709\u6807\u7B7E",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "\u65E0\u6807\u7B7E",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "\u6709\u7B14\u8BB0",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u7840",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "\u6837\u5F0F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u5206\u7EC4",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u6807\u7B7E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u5EF6\u8FDF",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8BED\u8A00\u8BBE\u7F6E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u9009\u62E9\u60A8\u559C\u6B22\u7684\u8BED\u8A00\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "\u754C\u9762\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "\u8BBE\u7F6E\u7BA1\u7406\u5668\u754C\u9762\u662F\u5426\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u76EE\u5F55\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4EE5\u63D0\u5347\u6D4F\u89C8\u4F53\u9A8C\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "\u59CB\u7EC8\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6C38\u4E0D\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "\u60AC\u6D6E\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "\u5355\u51FB\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u5206\u7EC4\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4F7F\u5206\u7EC4\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u6807\u7B7E\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u6807\u7B7E\u7684\u6837\u5F0F\uFF0C\u4F7F\u6807\u7B7E\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u5EF6\u65F6\u542F\u52A8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u542F\u7528\u5EF6\u65F6\u542F\u52A8\u529F\u80FD\u53EF\u4EE5\u4F18\u5316\u52A0\u8F7D\u987A\u5E8F\uFF0C\u4F46\u8BF7\u6CE8\u610F\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5BFC\u81F4\u67D0\u4E9B\u63D2\u4EF6\u51FA\u73B0\u517C\u5BB9\u6027\u95EE\u9898\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u6DE1\u5316\u63D2\u4EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u4E3A\u672A\u542F\u7528\u7684\u63D2\u4EF6\u63D0\u4F9B\u89C6\u89C9\u6DE1\u5316\u6548\u679C\uFF0C\u4EE5\u4FBF\u6E05\u6670\u5730\u533A\u5206\u542F\u7528\u548C\u672A\u542F\u7528\u7684\u63D2\u4EF6\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "\u7B5B\u9009\u6301\u4E45\u5316",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "\u542F\u7528\u540E\uFF0C\u60A8\u5C06\u5728\u6BCF\u6B21\u6253\u5F00\u7BA1\u7406\u5668\u65F6\u770B\u5230\u76F8\u540C\u7684\u63D2\u4EF6\u5217\u8868\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u5355\u72EC\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u5355\u72EC\u63A7\u5236\u6BCF\u4E2A\u63D2\u4EF6\u7684\u542F\u7528\u548C\u7981\u7528\u72B6\u6001\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u5206\u7EC4\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u4E00\u952E\u542F\u7528\u6216\u7981\u7528\u6307\u5B9A\u5206\u7EC4\u4E2D\u7684\u6240\u6709\u63D2\u4EF6\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5EF6\u8FDF] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5EF6\u8FDF] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5EF6\u8FDF] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5EF6\u8FDF] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5EF6\u8FDF\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5206\u7EC4] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5206\u7EC4] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5206\u7EC4] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5206\u7EC4] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5206\u7EC4\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u6807\u7B7E] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u6807\u7B7E] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u6807\u7B7E] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u6807\u7B7E] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u6807\u7B7E\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u5982\u679C\u9047\u5230\u672C\u63D2\u4EF6\u4E0E\u5176\u4ED6\u63D2\u4EF6\u51B2\u7A81",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u4E2A\u4EBA\u80FD\u529B\u6709\u9650\uFF0C\u65E0\u6CD5\u4FEE\u590D\u6B64\u95EE\u9898\uFF0C\u8BF7\u5173\u95ED\u5EF6\u65F6\u542F\u52A8\uFF0C\u5373\u53EF\u89E3\u51B3\u4E00\u5207\u51B2\u7A81\u95EE\u9898\u3002",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u5F00\u542F\u63D2\u4EF6\u7BA1\u7406\u5668"
};

// src/lang/locale/en.ts
var en_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Plugin Manager",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Success",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Failure",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Add",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operation",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Search",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Name",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "No Delay",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Enable",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Disable",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "Disable",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "Disable",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "Group",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "One - click Enable",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "One - click Disable",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "Note",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "Hotkeys",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "Single start",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "Restart plugin",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "All",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Enabled only",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "Disabled only",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "Grouped",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Ungrouped",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "With tags",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "Without tags",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "With notes",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visit the author's GitHub page to view project details, update logs, participate in discussions, and contribute code.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Access video tutorials",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Enable edit mode for in-depth plugin configuration customization",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Reload plugins to take effect immediately",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Check for plugin updates",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Disable all plugins at once",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Enable all plugins at once",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Manage plugin settings",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Only display enabled plugins",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Filter all ungrouped plugins",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Open the settings interface",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restore to the initial state",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Open the plugin directory",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Completely delete the plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Toggle the plugin status",
  \u5378\u8F7D_\u6807\u9898: "Uninstall Plugin",
  \u5378\u8F7D_\u63D0\u793A: "Are you sure you want to uninstall this plugin? This will delete the plugin's folder.",
  \u5378\u8F7D_\u5378\u8F7D: "Uninstall",
  \u5378\u8F7D_\u53D6\u6D88: "Cancel",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Uninstalled successfully",
  \u4E00\u952E_\u6807\u9898: "One-click Enable/Disable Plugins",
  \u4E00\u952E_\u63D0\u793A: "Are you sure you want to enable/disable the plugins on this page with one click? This action cannot be undone. (Please wait patiently during the enable/disable process)",
  \u4E00\u952E_\u542F\u7981: "Enable/Disable",
  \u4E00\u952E_\u53D6\u6D88: "Cancel",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "Enable/Disable Successful",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Basic",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "Style",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Delay",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Language Settings",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choose your preferred language.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "Center the interface",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "Set whether the manager interface is centered",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Directory Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to enhance the browsing experience.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "Always Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "Never Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "Hover to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "Click to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Group Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Tag Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the tag to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Delayed Startup",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Enabling the delayed startup feature can optimize the loading order, but please note that this may cause compatibility issues with some plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Fade Plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Provide a visual fade effect for disabled plugins to clearly distinguish between enabled and disabled plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "Filter Persistence",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "After enabling, you will see the same plugin list every time you open the manager.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands Separately",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to control the enabled and disabled state of each plugin separately. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands by Group",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to enable or disable all plugins in a specified group with one click. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Delay] Added",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Delay] ID already exists or is empty",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Delay] Deleted successfully",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Delay] Deletion failed, plugins exist under this delay",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Group] Added",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Group] ID already exists or is empty",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Group] Deleted successfully",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Group] Deletion failed, plugins exist under this group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Added",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] ID already exists or is empty",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Deleted successfully",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] Deletion failed, plugins exist under this tag",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "If You Encounter Conflicts with Other Plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Due to limited capabilities, I cannot fix this issue. Please disable delayed startup to resolve all conflict issues.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Open the plugin manager"
};

// src/lang/locale/ru.ts
var ru_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u0423\u0441\u043F\u0435\u0445",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u041D\u0435\u0443\u0434\u0430\u0447\u0430",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u041F\u043E\u0438\u0441\u043A",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u0411\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u0411\u0435\u0437 \u043C\u0435\u0442\u043A\u0438",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u0411\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u0412\u0441\u0435\u0433\u043E",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0430\u0432\u0442\u043E\u0440\u0430 \u043D\u0430 GitHub, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430, \u0436\u0443\u0440\u043D\u0430\u043B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439, \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u043E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u0438 \u0438 \u0432\u043D\u0435\u0441\u0442\u0438 \u0441\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434 \u0432 \u043A\u043E\u0434.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0432\u0438\u0434\u0435\u043E\u0443\u0440\u043E\u043A\u0430\u043C",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0440\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0434\u043B\u044F \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0432\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F \u0432 \u0441\u0438\u043B\u0443",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0434\u0430\u043B\u0438\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  \u5378\u8F7D_\u6807\u9898: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u5378\u8F7D_\u63D0\u793A: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D? \u042D\u0442\u043E \u0443\u0434\u0430\u043B\u0438\u0442 \u043F\u0430\u043F\u043A\u0443 \u043F\u043B\u0430\u0433\u0438\u043D\u0430.",
  \u5378\u8F7D_\u5378\u8F7D: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  \u5378\u8F7D_\u53D6\u6D88: "\u041E\u0442\u043C\u0435\u043D\u0430",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u0413\u0440\u0443\u043F\u043F\u0430",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u041C\u0435\u0442\u043A\u0430",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u044F\u0437\u044B\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u044F\u0437\u044B\u043A.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u043C\u0435\u0442\u043A\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u043C\u0435\u0442\u043A\u0438 \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043C\u043E\u0436\u0435\u0442 \u043E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438, \u043D\u043E \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u044D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u0441 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u0421\u043B\u0430\u0431\u043E \u0432\u0438\u0434\u0438\u043C\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442 \u0441\u043B\u0430\u0431\u043E\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432, \u0447\u0442\u043E\u0431\u044B \u0447\u0435\u0442\u043A\u043E \u0440\u0430\u0437\u043B\u0438\u0447\u0430\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0434\u043B\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430. (\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u0432\u043D\u0435\u0441\u0442\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432 \u043F\u043E \u0433\u0440\u0443\u043F\u043F\u0430\u043C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u044D\u0442\u043E\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0434\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432 \u0432 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435 \u043E\u0434\u043D\u0438\u043C \u043A\u043B\u0438\u043A\u043E\u043C. (\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u0432\u043D\u0435\u0441\u0442\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u043E\u0439 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u043E\u0439",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0413\u0440\u0443\u043F\u043F\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0432 \u044D\u0442\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u041C\u0435\u0442\u043A\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u041C\u0435\u0442\u043A\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u041C\u0435\u0442\u043A\u0430] \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u041C\u0435\u0442\u043A\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u043E\u0439 \u043C\u0435\u0442\u043A\u043E\u0439",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u0415\u0441\u043B\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u044E\u0442 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B \u0441 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u0418\u0437-\u0437\u0430 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0435\u0439 \u044F \u043D\u0435 \u043C\u043E\u0433\u0443 \u0438\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u044D\u0442\u0443 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0443 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435, \u0447\u0442\u043E\u0431\u044B \u0440\u0435\u0448\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u0430.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432"
};

// src/lang/locale/ja.ts
var ja_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u6557",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u8FFD\u52A0",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u691C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u524D",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u30B0\u30EB\u30FC\u30D7\u306A\u3057",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u30BF\u30B0\u306A\u3057",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u9045\u5EF6\u306A\u3057",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u5408\u8A08",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u6709\u52B9",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7121\u52B9",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u8457\u8005\u306EGitHub\u30DA\u30FC\u30B8\u3092\u8A2A\u308C\u3001\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306E\u8A73\u7D30\u3001\u66F4\u65B0\u30ED\u30B0\u3001\u8B70\u8AD6\u3078\u306E\u53C2\u52A0\u3001\u30B3\u30FC\u30C9\u3078\u306E\u8CA2\u732E\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u30D3\u30C7\u30AA\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u306B\u30A2\u30AF\u30BB\u30B9",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u7DE8\u96C6\u30E2\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3057\u3066\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u5373\u5EA7\u306B\u52B9\u679C\u3092\u767A\u63EE\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u3059\u308B",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u7121\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u6709\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u7BA1\u7406\u3059\u308B",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u6709\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u307F\u3092\u8868\u793A\u3059\u308B",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u8A2D\u5B9A\u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30FC\u30B9\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u521D\u671F\u72B6\u614B\u306B\u623B\u3059",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u5B8C\u5168\u306B\u524A\u9664\u3059\u308B",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30B9\u30C6\u30FC\u30BF\u30B9\u3092\u5207\u308A\u66FF\u3048\u308B",
  \u5378\u8F7D_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u63D0\u793A: "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A9\u30EB\u30C0\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u53D6\u6D88: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u672C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u30B0\u30EB\u30FC\u30D7",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u30BF\u30B0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u9045\u5EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8A00\u8A9E\u8A2D\u5B9A",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u304A\u597D\u307F\u306E\u8A00\u8A9E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u4F53\u9A13\u3092\u5411\u4E0A\u3055\u305B\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u30BF\u30B0\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u30BF\u30B0\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u6A5F\u80FD\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u8AAD\u307F\u8FBC\u307F\u9806\u5E8F\u3092\u6700\u9069\u5316\u3067\u304D\u307E\u3059\u304C\u3001\u4E00\u90E8\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3067\u4E92\u63DB\u6027\u554F\u984C\u304C\u767A\u751F\u3059\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A7\u30FC\u30C9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u7121\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u8996\u899A\u7684\u306A\u30D5\u30A7\u30FC\u30C9\u52B9\u679C\u3092\u63D0\u4F9B\u3057\u3066\u3001\u6709\u52B9\u3068\u7121\u52B9\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u660E\u78BA\u306B\u533A\u5225\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u500B\u5225\u306B\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u5404\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u6709\u52B9/\u7121\u52B9\u72B6\u614B\u3092\u500B\u5225\u306B\u5236\u5FA1\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u3054\u3068\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u6307\u5B9A\u3055\u308C\u305F\u30B0\u30EB\u30FC\u30D7\u5185\u306E\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u3067\u6709\u52B9\u307E\u305F\u306F\u7121\u52B9\u306B\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u9045\u5EF6] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u9045\u5EF6] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u9045\u5EF6] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u9045\u5EF6] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u9045\u5EF6\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30B0\u30EB\u30FC\u30D7] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30B0\u30EB\u30FC\u30D7] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30B0\u30EB\u30FC\u30D7\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30BF\u30B0] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30BF\u30B0] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30BF\u30B0] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30BF\u30B0] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30BF\u30B0\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u4ED6\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3068\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u304C\u767A\u751F\u3057\u305F\u5834\u5408",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u80FD\u529B\u306B\u9650\u308A\u304C\u3042\u308B\u305F\u3081\u3001\u3053\u306E\u554F\u984C\u3092\u4FEE\u6B63\u3067\u304D\u307E\u305B\u3093\u3002\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u3092\u7121\u52B9\u306B\u3059\u308B\u3053\u3068\u3067\u3001\u3059\u3079\u3066\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u554F\u984C\u3092\u89E3\u6C7A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u3092\u958B\u304F"
};

// src/lang/locale/ko.ts
var ko_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\uC131\uACF5",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\uC2E4\uD328",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\uCD94\uAC00",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\uC791\uC5C5",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\uAC80\uC0C9",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\uC774\uB984",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\uADF8\uB8F9 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\uD0DC\uADF8 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\uB51C\uB808\uC774 \uC5C6\uC74C",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\uCD1D\uACC4",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\uD65C\uC131\uD654",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\uBE44\uD65C\uC131\uD654",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\uC800\uC790\uC758 GitHub \uD398\uC774\uC9C0\uB97C \uBC29\uBB38\uD558\uC5EC \uD504\uB85C\uC81D\uD2B8 \uC138\uBD80 \uC815\uBCF4, \uC5C5\uB370\uC774\uD2B8 \uB85C\uADF8, \uD1A0\uB860 \uCC38\uC5EC, \uCF54\uB4DC \uAE30\uC5EC\uB97C \uD655\uC778\uD558\uC138\uC694.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\uBE44\uB514\uC624 \uD29C\uD1A0\uB9AC\uC5BC\uC5D0 \uC561\uC138\uC2A4",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\uD3B8\uC9D1 \uBAA8\uB4DC\uB97C \uD65C\uC131\uD654\uD558\uC5EC \uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uC790\uC138\uD788 \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uB2E4\uC2DC \uB85C\uB4DC\uD558\uC5EC \uC989\uC2DC \uC801\uC6A9\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC5C5\uB370\uC774\uD2B8\uB97C \uD655\uC778\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uAD00\uB9AC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uB9CC \uD45C\uC2DC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\uC124\uC815 \uC778\uD130\uD398\uC774\uC2A4\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\uCD08\uAE30 \uC0C1\uD0DC\uB85C \uBCF5\uC6D0\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uB514\uB809\uD1A0\uB9AC\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uC644\uC804\uD788 \uC0AD\uC81C\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC0C1\uD0DC\uB97C \uC804\uD658\uD558\uC138\uC694",
  \u5378\u8F7D_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uC81C\uAC70",
  \u5378\u8F7D_\u63D0\u793A: "\uC774 \uD50C\uB7EC\uADF8\uC778\uC744 \uC81C\uAC70\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? \uC774 \uC791\uC5C5\uC740 \uD50C\uB7EC\uADF8\uC778 \uD3F4\uB354\uB97C \uC0AD\uC81C\uD569\uB2C8\uB2E4.",
  \u5378\u8F7D_\u5378\u8F7D: "\uC81C\uAC70",
  \u5378\u8F7D_\u53D6\u6D88: "\uCDE8\uC18C",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\uC131\uACF5\uC801\uC73C\uB85C \uC81C\uAC70\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\uAE30\uBCF8",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\uADF8\uB8F9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\uD0DC\uADF8",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\uB51C\uB808\uC774",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\uC5B8\uC5B4 \uC124\uC815",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\uC120\uD638\uD558\uB294 \uC5B8\uC5B4\uB97C \uC120\uD0DD\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\uB514\uB809\uD1A0\uB9AC \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uBE0C\uB77C\uC6B0\uC9D5 \uACBD\uD5D8\uC744 \uD5A5\uC0C1\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\uD0DC\uADF8 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\uD0DC\uADF8\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\uC9C0\uC5F0 \uC2DC\uC791",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\uC9C0\uC5F0 \uC2DC\uC791 \uAE30\uB2A5\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uB85C\uB529 \uC21C\uC11C\uB97C \uCD5C\uC801\uD654\uD560 \uC218 \uC788\uC9C0\uB9CC, \uC77C\uBD80 \uD50C\uB7EC\uADF8\uC778\uC5D0\uC11C \uD638\uD658\uC131 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C \uC720\uC758\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uD750\uB9AC\uAC8C \uD45C\uC2DC",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC5D0 \uC2DC\uAC01\uC801\uC778 \uD750\uB9BC \uD6A8\uACFC\uB97C \uC81C\uACF5\uD558\uC5EC \uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uACFC \uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC744 \uBA85\uD655\uD788 \uAD6C\uBD84\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uBA85\uB839\uC744 \uBCC4\uB3C4\uB85C \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uAC01 \uD50C\uB7EC\uADF8\uC778\uC758 \uD65C\uC131\uD654/\uBE44\uD65C\uC131\uD654 \uC0C1\uD0DC\uB97C \uBCC4\uB3C4\uB85C \uC81C\uC5B4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\uADF8\uB8F9\uBCC4 \uD50C\uB7EC\uADF8\uC778 \uBA85\uB839 \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uC9C0\uC815\uB41C \uADF8\uB8F9\uC758 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD55C \uBC88 \uD074\uB9AD\uC73C\uB85C \uD65C\uC131\uD654\uD558\uAC70\uB098 \uBE44\uD65C\uC131\uD654\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uB51C\uB808\uC774] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uB51C\uB808\uC774] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uB51C\uB808\uC774] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uB51C\uB808\uC774] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uB51C\uB808\uC774\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uADF8\uB8F9] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uADF8\uB8F9] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uADF8\uB8F9] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uADF8\uB8F9] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uADF8\uB8F9\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uD0DC\uADF8] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uD0DC\uADF8] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uD0DC\uADF8] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uD0DC\uADF8] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uD0DC\uADF8\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\uB2E4\uB978 \uD50C\uB7EC\uADF8\uC778\uACFC\uC758 \uCDA9\uB3CC\uC774 \uBC1C\uC0DD\uD560 \uACBD\uC6B0",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\uB2A5\uB825\uC774 \uC81C\uD55C\uB418\uC5B4 \uC788\uC5B4 \uC774 \uBB38\uC81C\uB97C \uD574\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC5F0 \uC2DC\uC791\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC5EC \uBAA8\uB4E0 \uCDA9\uB3CC \uBB38\uC81C\uB97C \uD574\uACB0\uD558\uC138\uC694.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790\uB97C \uC5FD\uB2C8\uB2E4"
};

// src/lang/locale/fr.ts
var fr_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Gestionnaire de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Succ\xE8s",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\xC9chec",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Ajouter",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Op\xE9ration",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Recherche",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nom",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Aucun groupe",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Aucun tag",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Aucun retard",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Activer",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "D\xE9sactiver",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visitez la page GitHub de l'auteur pour voir les d\xE9tails du projet, les journaux de mise \xE0 jour, participer aux discussions et contribuer du code.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acc\xE9dez aux tutoriels vid\xE9o",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Activez le mode \xE9dition pour une personnalisation approfondie de la configuration des plugins",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Rechargez les plugins pour qu'ils prennent effet imm\xE9diatement",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "V\xE9rifiez les mises \xE0 jour des plugins",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "D\xE9sactivez tous les plugins en une fois",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Activez tous les plugins en une fois",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "G\xE9rez les param\xE8tres des plugins",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Affichez uniquement les plugins activ\xE9s",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Ouvrez l'interface de param\xE8tres",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "R\xE9tablissez l'\xE9tat initial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Ouvrez le r\xE9pertoire des plugins",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Supprimez compl\xE8tement le plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Basculer l'\xE9tat du plugin",
  \u5378\u8F7D_\u6807\u9898: "D\xE9sinstaller le plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xCAtes-vous s\xFBr de vouloir d\xE9sinstaller ce plugin ? Cela supprimera le dossier du plugin.",
  \u5378\u8F7D_\u5378\u8F7D: "D\xE9sinstaller",
  \u5378\u8F7D_\u53D6\u6D88: "Annuler",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "D\xE9sinstall\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Param\xE8tres de base",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Groupe",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retard",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Param\xE8tres de langue",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choisissez votre langue pr\xE9f\xE9r\xE9e.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Style du r\xE9pertoire",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du groupe pour am\xE9liorer l'exp\xE9rience de navigation.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Style du groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du groupe pour le rendre plus visible et facile \xE0 identifier.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Style du tag",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Choisissez le style du tag pour le rendre plus visible et facile \xE0 identifier.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "D\xE9marrage diff\xE9r\xE9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "L'activation de la fonction de d\xE9marrage diff\xE9r\xE9 peut optimiser l'ordre de chargement, mais veuillez noter que cela peut causer des probl\xE8mes de compatibilit\xE9 avec certains plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Estomper les plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Appliquez un effet de transparence visuel aux plugins d\xE9sactiv\xE9s pour distinguer clairement les plugins activ\xE9s et d\xE9sactiv\xE9s.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Contr\xF4ler les commandes des plugins s\xE9par\xE9ment",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Activez cette option pour contr\xF4ler l'\xE9tat activ\xE9 et d\xE9sactiv\xE9 de chaque plugin s\xE9par\xE9ment. (Red\xE9marrez Obsidian pour que les modifications prennent effet)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Contr\xF4ler les commandes des plugins par groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Activez cette option pour activer ou d\xE9sactiver tous les plugins d'un groupe sp\xE9cifique avec un seul clic. (Red\xE9marrez Obsidian pour que les modifications prennent effet)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retard] Ajout\xE9",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retard] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retard] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retard] \xC9chec de la suppression, des plugins existent sous ce retard",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Groupe] Ajout\xE9",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Groupe] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Groupe] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Groupe] \xC9chec de la suppression, des plugins existent sous ce groupe",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Ajout\xE9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] L'ID existe d\xE9j\xE0 ou est vide",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Supprim\xE9 avec succ\xE8s",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] \xC9chec de la suppression, des plugins existent sous ce tag",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Si vous rencontrez des conflits avec d'autres plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "En raison de capacit\xE9s limit\xE9es, je ne peux pas r\xE9soudre ce probl\xE8me. Veuillez d\xE9sactiver le d\xE9marrage diff\xE9r\xE9 pour r\xE9soudre tous les probl\xE8mes de conflit.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Ouvrez le gestionnaire de plugins"
};

// src/lang/locale/es.ts
var es_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Administrador de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\xC9xito",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Fallo",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Agregar",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operaci\xF3n",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Buscar",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nombre",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Sin grupo",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Sin etiqueta",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Sin retraso",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Habilitar",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Deshabilitar",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visite la p\xE1gina de GitHub del autor para ver detalles del proyecto, registros de actualizaciones, participar en discusiones y contribuir con c\xF3digo.",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acceder a tutoriales en video",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Habilitar modo de edici\xF3n para una personalizaci\xF3n profunda de la configuraci\xF3n del plugin",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Recargar plugins para que surtan efecto inmediatamente",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Comprobar actualizaciones de plugins",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Deshabilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Habilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Administrar configuraci\xF3n de plugins",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Mostrar solo plugins habilitados",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Abrir la interfaz de configuraci\xF3n",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restaurar al estado inicial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Abrir el directorio de plugins",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Eliminar completamente el plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Alternar el estado del plugin",
  \u5378\u8F7D_\u6807\u9898: "Desinstalar Plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xBFEst\xE1 seguro de que desea desinstalar este plugin? Esto eliminar\xE1 la carpeta del plugin.",
  \u5378\u8F7D_\u5378\u8F7D: "Desinstalar",
  \u5378\u8F7D_\u53D6\u6D88: "Cancelar",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Desinstalado correctamente",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Configuraci\xF3n b\xE1sica",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Etiqueta",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Configuraci\xF3n de idioma",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Seleccione su idioma preferido.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Estilo del directorio",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para mejorar la experiencia de navegaci\xF3n.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Estilo del grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Estilo de la etiqueta",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo de la etiqueta para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Inicio con retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Habilitar la funci\xF3n de inicio con retraso puede optimizar el orden de carga, pero tenga en cuenta que esto puede causar problemas de compatibilidad con algunos plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Atenuar plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Proporcione un efecto de atenuaci\xF3n visual para plugins deshabilitados para distinguir claramente entre plugins habilitados y deshabilitados.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por separado",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para controlar el estado habilitado y deshabilitado de cada plugin por separado. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para habilitar o deshabilitar todos los plugins de un grupo espec\xEDfico con un solo clic. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retraso] A\xF1adido",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retraso] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retraso] Eliminado correctamente",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retraso] Fallo al eliminar, existen plugins bajo este retraso",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Grupo] A\xF1adido",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Grupo] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Grupo] Eliminado correctamente",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Grupo] Fallo al eliminar, existen plugins bajo este grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Etiqueta] A\xF1adido",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Etiqueta] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Etiqueta] Eliminado correctamente",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Etiqueta] Fallo al eliminar, existen plugins bajo esta etiqueta",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Si encuentra conflictos con otros plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Debido a capacidades limitadas, no puedo solucionar este problema. Por favor, deshabilite el inicio con retraso para resolver todos los problemas de conflicto.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Abrir el administrador de plugins"
};

// src/lang/inxdex.ts
var Translator = class {
  constructor(manager) {
    this.language = {
      "zh-cn": "\u7B80\u4F53\u4E2D\u6587",
      "en": "English",
      "ru": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
      "ja": "\u65E5\u672C\u8A9E",
      "ko": "\uD55C\uAD6D\uC5B4",
      "fr": "Fran\xE7ais",
      "es": "Espa\xF1ol"
    };
    this.localeMap = {
      "zh-cn": zh_cn_default,
      "en": en_default,
      "ru": ru_default,
      "ja": ja_default,
      "ko": ko_default,
      "fr": fr_default,
      "es": es_default
    };
    this.manager = manager;
  }
  // 方法用于获取翻译后的字符串
  t(str) {
    const language = this.manager.settings.LANGUAGE || "zh-cn";
    const locale = this.localeMap[language] || zh_cn_default;
    return locale[str] || zh_cn_default[str];
  }
};

// src/agreement.ts
var import_obsidian15 = require("obsidian");
var Agreement = class {
  /**
   * 构造函数，初始化插件安装器
   * @param SMPL - ShareMyPlugin 实例
   */
  constructor(SMPL) {
    // 标记是否已经加载了社区插件列表
    this.loaded = false;
    // 防抖函数，用于定时刷新社区插件列表，每小时执行一次
    this.debounceFetch = (0, import_obsidian15.debounce)(async () => {
      await this.fetchCommunityPlugins();
    }, 1e3 * 60 * 60);
    this.plugin = SMPL;
    this.fetchCommunityPlugins();
  }
  /**
   * 从远程获取社区插件列表，并将其转换为以插件 ID 为键的对象
   */
  async fetchCommunityPlugins() {
    const pluginList = await fetch(`https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`).then((r) => r.json());
    const keyedPluginList = {};
    for (const item of pluginList)
      keyedPluginList[item.id] = item;
    this.communityPlugins = keyedPluginList;
    this.loaded = true;
  }
  /**
   * 获取指定的插件
   * @param id - 要获取的插件的 ID
   */
  async pluginGithub(id) {
    if (!this.loaded) {
      await this.fetchCommunityPlugins();
    }
    const pluginInfo = this.communityPlugins[id];
    if (!pluginInfo) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return null;
    }
    window.open(`https://github.com/${pluginInfo.repo}`);
  }
  /**
   * 安装指定的插件
   * @param id - 要安装的插件的 ID
   * @param version - 要安装的插件的版本，默认为空字符串，表示不检查版本
   * @param enable - 安装后是否启用插件，默认为 false
   * @param github - 插件的 GitHub 仓库地址，默认为空字符串
   */
  async pluginInstall(id, version = "", enable = false, github = "") {
    var _a, _b;
    if (!this.loaded)
      await this.fetchCommunityPlugins();
    else
      this.debounceFetch();
    const pluginRegistry = this.plugin.app.plugins;
    let installFlag = false;
    const repo = github !== "" ? github : (_a = this.communityPlugins[id]) == null ? void 0 : _a.repo;
    console.log(repo);
    if (!repo) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return;
    }
    if (pluginRegistry.manifests[id]) {
      new import_obsidian15.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u63D2\u4EF6 ${pluginRegistry.manifests[id].name} \u5DF2\u5B89\u88C5`);
      if (version !== "" && version !== ((_b = pluginRegistry.manifests[id]) == null ? void 0 : _b.version))
        installFlag = true;
    } else {
      installFlag = true;
    }
    if (installFlag) {
      const manifest = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`).then((r) => r.json());
      if (version.toLowerCase() === "latest" || version === "")
        version = manifest.version;
      await pluginRegistry.installPlugin(repo, version, manifest);
    }
    if (enable) {
      await pluginRegistry.loadPlugin(id);
      await pluginRegistry.enablePluginAndSave(id);
    } else {
      await pluginRegistry.disablePlugin(id);
    }
  }
  /**
   * 解析安装参数并调用 installPlugin 方法安装插件
   * @param params - 包含插件安装参数的对象
   */
  async parsePluginInstall(params) {
    var _a, _b;
    let args = {
      id: params.id,
      version: (_a = params == null ? void 0 : params.version) != null ? _a : "",
      enable: ["", "true", "1"].includes(params.enable.toLowerCase()),
      github: (_b = params.github) != null ? _b : ""
    };
    this.pluginInstall(args.id, args.version, args.enable);
  }
  /**
   * 解析包含插件信息的字符串或对象，获取插件的相关信息
   * @param input - 包含插件信息的字符串或对象
   * @return - 返回解析后的插件信息对象，如果解析失败则返回 null
   */
  async parsePluginGithub(params) {
    let args = { id: params.id };
    await this.pluginGithub(args.id);
  }
};

// src/main.ts
var Manager = class extends import_obsidian16.Plugin {
  async onload() {
    this.appPlugins = this.app.plugins;
    this.appWorkspace = this.app.workspace;
    console.log(`%c ${this.manifest.name} %c v${this.manifest.version} `, `padding: 2px; border-radius: 2px 0 0 2px; color: #fff; background: #5B5B5B;`, `padding: 2px; border-radius: 0 2px 2px 0; color: #fff; background: #409EFF;`);
    await this.loadSettings();
    this.translator = new Translator(this);
    this.addRibbonIcon("folder-cog", this.translator.t("\u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C"), () => {
      this.managerModal = new ManagerModal(this.app, this);
      this.managerModal.open();
    });
    this.addSettingTab(new ManagerSettingTab(this.app, this));
    this.settings.DELAY ? this.enableDelay() : this.disableDelay();
    command_default(this.app, this);
    this.agreement = new Agreement(this);
    this.registerObsidianProtocolHandler("BPM-plugin-install", async (params) => {
      await this.agreement.parsePluginInstall(params);
    });
    this.registerObsidianProtocolHandler("BPM-plugin-github", async (params) => {
      await this.agreement.parsePluginGithub(params);
    });
  }
  async onunload() {
    if (this.settings.DELAY)
      this.disableDelaysForAllPlugins();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // 关闭延时 调用
  disableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
  }
  // 开启延时 调用
  enableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach((plugin) => this.startPluginWithDelay(plugin.id));
  }
  // 为所有插件启动延迟
  enableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach(async (plugin) => {
      const isEnabled = this.appPlugins.enabledPlugins.has(plugin.id);
      if (isEnabled) {
        await this.appPlugins.disablePluginAndSave(plugin.id);
        await this.appPlugins.enablePlugin(plugin.id);
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = true;
        this.saveSettings();
      } else {
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = false;
        this.saveSettings();
      }
    });
  }
  // 为所有插件关闭延迟
  disableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    plugins.forEach(async (pm) => {
      const plugin = this.settings.Plugins.find((p) => p.id === pm.id);
      if (plugin) {
        if (plugin.enabled) {
          await this.appPlugins.disablePlugin(pm.id);
          await this.appPlugins.enablePluginAndSave(pm.id);
        }
      }
    });
  }
  // 延时启动指定插件
  startPluginWithDelay(id) {
    const plugin = this.settings.Plugins.find((p) => p.id === id);
    if (plugin && plugin.enabled) {
      const delay = this.settings.DELAYS.find((item) => item.id === plugin.delay);
      const time = delay ? delay.time : 0;
      setTimeout(() => {
        this.appPlugins.enablePlugin(id);
      }, time * 1e3);
    }
  }
  // 同步插件到配置文件
  synchronizePlugins(p1) {
    const p2 = this.settings.Plugins;
    p2.forEach((p2Item) => {
      if (!p1.some((p1Item) => p1Item.id === p2Item.id)) {
        this.settings.Plugins = this.settings.Plugins.filter((pm) => pm.id !== p2Item.id);
      }
    });
    p1.forEach((p1Item) => {
      if (!p2.some((p2Item) => p2Item.id === p1Item.id)) {
        const isEnabled = this.appPlugins.enabledPlugins.has(p1Item.id);
        this.settings.Plugins.push({
          "id": p1Item.id,
          "name": p1Item.name,
          "desc": p1Item.description,
          "group": "",
          "tags": [],
          "enabled": isEnabled,
          "delay": "",
          "note": ""
        });
      }
    });
    this.saveSettings();
  }
  // 工具函数
  createTag(text, color, type) {
    const style = this.generateTagStyle(color, type);
    const tag = createEl("span", {
      text,
      cls: "manager-tag",
      attr: { "style": style }
    });
    return tag;
  }
  generateTagStyle(color, type) {
    let style;
    const [r, g, b] = this.hexToRgbArray(color);
    switch (type) {
      case "a":
        style = `color: #fff; background-color: ${color}; border-color: ${color};`;
        break;
      case "b":
        style = `color: ${color}; background-color: transparent; border-color: ${color};`;
        break;
      case "c":
        style = `color: ${color}; background-color: rgba(${r}, ${g}, ${b}, 0.3); border-color: ${color};`;
        break;
      case "d":
        style = `color: ${color}; background-color: ${this.adjustColorBrightness(color, 50)}; border-color: ${this.adjustColorBrightness(color, 50)};`;
        break;
      default:
        style = `background-color: transparent;border-style: dashed;`;
    }
    return style;
  }
  hexToRgbArray(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = rgb >> 16;
    const g = rgb >> 8 & 255;
    const b = rgb & 255;
    return [r, g, b];
  }
  adjustColorBrightness(hex, amount) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (rgb >> 16 & 255) + amount));
    const g = Math.min(255, Math.max(0, (rgb >> 8 & 255) + amount));
    const b = Math.min(255, Math.max(0, (rgb & 255) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
};

// main.ts
var main_default = Manager;


/* nosourcemap */