export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // 1. element
  const el = (vnode.el = document.createElement(tag));
  // 2. props
  if (props) {
    for (let [key, value] of Object.entries(props)) {
      el.setAttribute(key, value);
    }
  }
  // 3. children
  if (typeof children === "string") {
    el.append(document.createTextNode(children));
  } else if (Array.isArray(children)) {
    children.forEach(v => mountElement(v, el));
  }
  // 4. 插入
  container.append(el);
}

/**
 *
 * @param {Vnode} n1 oldVnode 老节点
 * @param {Vnode} n2 newVnode 新节点
 */
export function diff(n1, n2) {
  const { tag: oldTag, props: oldProps, el, children: oldChildren } = n1;
  const { tag: newTag, props: newProps, children: newChildren } = n2;
  n2.el = el;
  // 1. tag
  if (oldTag !== newTag) {
    el.replaceWith(document.createElement(n2.tag));
  } else {
    // 2. props
    //  2.1 新增和修改
    if (newProps && oldProps) {
      for (const [key, newVal] of Object.entries(newProps)) {
        if (newVal !== oldProps[key]) {
          el.setAttribute(key, newVal);
        }
      }
    }
    //  2.2 删除
    if (oldProps) {
      for (const key of Object.keys(oldProps)) {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      }
    }
    // 3. children -> 暴力解法
    //  3.1 newChildren -> string (oldChildren: string, oldChildren: array)
    //  3.2 newChildren -> array (oldChildren: string, oldChildren: array)
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else if (Array.isArray(oldChildren)) {
        el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        el.innerText = "";
        mountElement(n2, el);
      } else if (Array.isArray(oldChildren)) {
        // new {a, b, c}
        // old {a, d, c, e}
        const oldChildrenLen = oldChildren.length;
        const newChildrenLen = newChildren.length;
        const minLen = Math.min(oldChildrenLen, newChildrenLen);

        // 处理公共的vnode
        for (let index = 0; index < minLen; index++) {
          diff(oldChildren[index], newChildren[index]);
        }

        if (newChildrenLen > minLen) {
          // 新增
          for (let index = minLen; index < newChildrenLen; index++) {
            mountElement(newChildren[index], el);
          }
        }
        if (oldChildrenLen > minLen) {
          // 删除
          for (let index = minLen; index < oldChildrenLen; index++) {
            const oldVnodeEl = oldChildren[index].el;
            oldVnodeEl.parentNode.removeChild(oldVnodeEl);
          }
        }
      }
    }
  }
}
