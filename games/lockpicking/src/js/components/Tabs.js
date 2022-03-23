import { uniqueId } from "../utils/uniqueId.js";

/**
 * Creates a new Tabs
 * @class Tabs
 */

export class Tabs {
  constructor(options) {
    this.node = null;
    this.options = options;
    this.id = "";
  }

  getHTML() {
    return `
      ${this.renderInputs()}
      <div class="tabs">
      ${this.renderLabels()}
       
      </div>
      <div class="tabs__content">
        ${this.renderContent()}
      </div>
    `;
  }

  renderInputs() {
    const tabKeys = Object.keys(this.options.tabs);
    let HTML = "";
    tabKeys.forEach((tabKey) => {
      HTML += `<input type="radio" id="${this.options.tabs[tabKey].id}" name="tabs-radio" class="tabs__radio visually-hidden" />`;
    });
    return HTML;
  }
  //return string
  renderLabels() {
    const tabKeys = Object.keys(this.options.tabs);
    let HTML = "";
    tabKeys.forEach((tabKey) => {
      HTML += `<label for="${this.options.tabs[tabKey].id}" class="tabs__label">${this.options.tabs[tabKey].name}</label>`;
    });
    return HTML;
  }
  //return string
  renderContent() {
    const tabKeys = Object.keys(this.options.tabs);
    let HTML = "";
    tabKeys.forEach((tabKey) => {
      HTML += `
      <div class="tabs-content__element"> 
        ${this.options.tabs[tabKey].content}
      </div>`;
    });
    return HTML;
  }
  //return string
  createUniqeId() {
    const tabKeys = Object.keys(this.options.tabs);
    tabKeys.forEach((tabKey) => {
      this.options.tabs[tabKey].id = uniqueId();
    });
  }

  //

  render(selector) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) {
      throw new Error(`element with ${selector} not found`);
    }
    this.createUniqeId();
    const tabsEl = document.createElement("div");
    tabsEl.className = "tabs-wrapper";
    tabsEl.id = uniqueId();
    tabsEl.innerHTML = this.getHTML();
    parentNode.prepend(tabsEl);
    this.node = document.getElementById(tabsEl.id);
  }
}
