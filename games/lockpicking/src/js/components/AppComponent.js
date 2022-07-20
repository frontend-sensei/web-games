import { Component } from "./Component.js";
import { TestComponent1 } from "./test-component-1.js";

export class App extends Component {
  constructor() {
    const options = {
      components: {
        TestComponent1,
      },
    };
    super(options);
  }

  render(selector = "") {
    this.findParentNode(selector);
    super.render();
  }

  findParentNode(selector) {
    const parentNode = document.querySelector(selector);
    if (!parentNode) {
      throw new Error(`Parent node with selector ${selector} is not found`);
    }
    this.parentNode = parentNode;
  }

  renderNode() {
    const node = this.createNode();
    this.parentNode.appendChild(node);
  }

  html() {
    return `
    <div>
      <div>Self</div>
      <!-- TestComponent1 -->
      <!-- test-component-2 -->
      <!-- TestComponent1 -->
    </div>
    `;
  }
}
