import { reactive } from "./reactivity/index.js";
import { h } from "./runtime-core/index.js";

// 5.3 综合例子
// a b (c d e z) f g
// a b (d c y e) f g
const prevChildren = [
  h("p", { key: "A" }, "A"),
  h("p", { key: "B" }, "B"),
  h("p", { key: "C" }, "C"),
  h("p", { key: "D" }, "D"),
  h("p", { key: "E" }, "E"),
  h("p", { key: "Z" }, "Z"),
  h("p", { key: "F" }, "F"),
  h("p", { key: "G" }, "G")
];
const nextChildren = [
  h("p", { key: "A" }, "A"),
  h("p", { key: "B" }, "B"),
  h("p", { key: "D" }, "D"),
  h("p", { key: "C" }, "C"),
  h("p", { key: "Y" }, "Y"),
  h("p", { key: "E" }, "E"),
  h("p", { key: "F" }, "F")
];

export default {
  // template => render
  render(context) {
    return h("div", { id: `app-${context.state.count}`, class: "app-class" }, [
      h("p", {}, `${context.state.count}`),
      h("p", {}, `${context.state.isChange}`),
      h(
        "div",
        { class: "content" },
        context.state.isChange === true ? nextChildren : prevChildren
      )
    ]);
  },
  setup() {
    const state = reactive({ count: 0, isChange: false });
    window.state = state;
    return { state };
  }
};
