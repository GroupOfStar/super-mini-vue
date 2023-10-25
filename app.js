import { reactive } from "./reactivity/index.js";
import { h } from "./runtime-core/index.js";

export default {
  // template => render
  render(context) {
    return h(
      "div",
      { id: `app-${context.state.count}`, class: "app-class" },
      "hah"
    );
  },
  setup() {
    const state = reactive({ count: 0 });
    window.state = state;
    return { state };
  }
};
