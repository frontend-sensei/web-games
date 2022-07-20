import { uniqueId } from "../utils/uniqueId.js";
import { isObjectEmpty } from "../utils/isObjectEmpty.js";

const COMPONENT_ID_ATTRIBUTE = "component-id";

export class Component {
  constructor(options = {}) {
    this.name = this.constructor.name;
    this.el = null;
    this.id = null;
    this.props = options.props || {};
    this.components = options.components || {};
    this.parentNode = options.parentNode || {};
  }

  render() {
    this.isComponentDeclarationExists();
    this.renderSelf();
    this.renderComponents();
  }

  isComponentDeclarationExists() {
    // console.log("Component", this.name, this.parentNode.childNodes);
  }

  renderSelf() {
    this.renderNode();
    this.el = document.querySelector(
      `[${COMPONENT_ID_ATTRIBUTE}="${this.id}"]`
    );
    console.log(this.el);
  }

  createNode() {
    const temporaryNode = document.createElement("div");
    temporaryNode.innerHTML = this.html();

    const htmlElements = [...temporaryNode.childNodes].filter(
      (childNode) => childNode instanceof HTMLElement
    );

    if (!htmlElements[0]) {
      console.warn("Element for rendering in the component not found");
      return;
    }

    this.id = uniqueId();
    const node = htmlElements[0];
    node.setAttribute(COMPONENT_ID_ATTRIBUTE, this.id);

    return node;
  }

  renderNode() {
    for (const childNode of this.parentNode.childNodes) {
      if (!(childNode instanceof Comment)) {
        continue;
      }
      const isTargetComment = childNode.nodeValue.trim() === this.name;
      if (isTargetComment) {
        const node = this.createNode();
        childNode.replaceWith(node);
      }
    }
  }

  renderComponents() {
    if (isObjectEmpty(this.components)) {
      return;
    }

    const comments = {};
    for (const node of this.el.childNodes) {
      if (node instanceof Comment) {
        comments[node.nodeValue.trim()] = node;
      }
    }

    for (const componentName in this.components) {
      this.renderComponent(this.components[componentName], comments);
    }
  }

  renderComponent(component, comments) {
    new component({
      parentNode: this.el,
    }).render();
  }
}
