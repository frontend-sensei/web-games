import { Component } from "./Component.js";

// This class should just create node. And parent node will replace corresponding comment with this node
export class TestComponent1 extends Component {
  constructor(options) {
    super(options);
  }

  html() {
    return `
    <div class="test-component-1">Test component 1</div>
    `;
  }
}
