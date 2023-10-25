import { effect } from "./../reactivity/index.js";
import { mountElement, diff } from "./renderer.js";

export function createApp(rootComponet) {
  return {
    mount(rootContainer) {
      const context = rootComponet.setup();
      let isMounted = false;
      let prevSubTree;
      effect(() => {
        // vdom
        const subTree = rootComponet.render(context);
        if (!isMounted) {
          isMounted = true;
          // reset
          rootContainer.innerText = "";
          // vdom => mount
          mountElement(subTree, rootContainer);
          prevSubTree = subTree;
        } else {
          diff(prevSubTree, subTree);
          prevSubTree = subTree;
        }
      });
    }
  };
}
