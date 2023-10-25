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

  return { ...vnode, el };
}

/**
 *
 * @param {Vnode} n1 oldVnode 老节点
 * @param {Vnode} n2 newVnode 新节点
 */
export function diff(n1, n2) {
  const { tag: oldTag, props: oldProps, el } = n1;
  const { tag: newTag, props: newProps } = n2;
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
    // 3. children
  }
}
