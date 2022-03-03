import { uniqueId } from "../../utils/uniqueId.js";

/**
 * Creates a new Popup
 * @class Popup
 */
export class Popup {
  constructor(options) {
    this.node = null;
    this.options = options;
    this.id = "";
    this.ANIMATION_DURATION = 500;
  }

  getHTML() {
    return `
    <div class="popup">
      <div class="popup-content">${this.options.html}</div>
    </div>
    `;
  }

  render() {
    const popupEl = document.createElement("div");
    popupEl.style.setProperty(
      "--transition-duration",
      `${this.ANIMATION_DURATION / 1000}s`
    );
    popupEl.className = "popup-wrapper";
    popupEl.id = uniqueId();
    popupEl.innerHTML = this.getHTML();
    document.body.appendChild(popupEl);
    this.node = document.getElementById(popupEl.id);
    setTimeout(() => this.node.classList.add("show"));

    this.addListeners();
    return this;
  }

  addListeners() {
    this.addButtonListeners();
    this.addCloseListener();
    this.addHideListener();
  }

  addButtonListeners() {
    const listeners = this.options.listeners || {};
    Object.entries(listeners).forEach((listenerData) => {
      const [id, listener] = listenerData;
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Element with id: "${id} not found"`);
        return;
      }
      el.addEventListener("click", listener);
    });
  }
  addHideListener() {
    if (!this.options.hasOwnProperty("hideButtonId")) {
      return;
    }
    const hideBtn = document.getElementById(this.options.hideButtonId);
    if (!hideBtn) {
      console.error(
        `Element with id: "${this.options.hideButtonId} not found"`
      );
      return;
    }
    hideBtn.addEventListener("click", this.hide.bind(this));
  }

  addCloseListener() {
    if (!this.options.hasOwnProperty("closeButtonId")) {
      return;
    }
    const closeBtn = document.getElementById(this.options.closeButtonId);
    if (!closeBtn) {
      console.error(
        `Element with id: "${this.options.closeButtonId} not found"`
      );
      return;
    }
    closeBtn.addEventListener("click", this.close.bind(this));
  }

  show() {
    this.node.classList.add("show");
    return this;
  }
  hide() {
    this.node.classList.remove("show");
    return this;
  }
  close() {
    this.node.classList.remove("show");
    setTimeout(() => this.node.remove(), this.ANIMATION_DURATION);
    return this;
  }
}
