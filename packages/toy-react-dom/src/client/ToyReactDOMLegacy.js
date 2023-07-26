'use strict';

import { flushSync } from 'toy-react-reconciler/src/ToyReactFiberReconciler';

const internals = {
  nextUnitOfWork: null,
  currentRoot: null,
  wipRoot: null,
  deletions: null,
  wipFiber: null,
  hookIndex: null,
};

export function render(element, container) {
  internals.wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: internals.currentRoot,
  };
  internals.deletions = [];
  internals.nextUnitOfWork = internals.wipRoot;

  flushSync(internals);
}

function isEvent(key) {
  return key.startsWith('on');
}
function isStyle(key) {
  return key === 'style';
}
function isChildren(key) {
  return key === 'children';
}
function isProperty(key) {
  return !isChildren() && !isEvent(key) && !isStyle(key);
}

export function hydrate(element, container) {
  const prevChildren = Array.from(container.childNodes);
  const nextChildren = Array.isArray(element) ? element : [element];

  nextChildren.forEach((nextChild, index) => {
    const prevChild = prevChildren[index];

    if (prevChild) {
      if (nextChild.type === 'TEXT_ELEMENT') {
        prevChildren.textContent = nextChild.props.nodeValue;
      } else if (nextChild.type instanceof Function) {
        const component = nextChild.type(nextChild.props);
        const child = component.render ? component.render() : component;
        for (const prop in child.props) {
          if (isChildren(prop)) {
            continue;
          }
          if (isStyle(prop)) {
            const styles = Object.entries(child.props[prop]);
            styles.forEach(([key, value]) => {
              prevChild[prop][key] = value;
            });
          }
          if (isProperty(prop)) {
            prevChild[prop] = nextChild.props[prop];
          }
          if (isEvent(prop)) {
            const eventType = prop.toLowerCase().substring(2);
            prevChild.addEventListener(eventType, nextChild.props[prop]);
          }
        }
        hydrate(child.props.children, prevChild);
      } else {
        hydrate(nextChild.props.children, prevChild);
        for (const prop in nextChild.props) {
          if (isChildren(prop)) {
            continue;
          }
          if (isStyle(prop)) {
            const styles = Object.entries(nextChild.props[prop]);
            styles.forEach(([key, value]) => {
              prevChild[prop][key] = value;
            });
          }
          if (isProperty(prop)) {
            prevChild[prop] = nextChild.props[prop];
          }
          if (isEvent(prop)) {
            const eventType = prop.toLowerCase().substring(2);
            prevChild.addEventListener(eventType, nextChild.props[prop]);
          }
        }
      }
    } else {
      container.appendChild(createDom(nextChild));
    }
  });

  while (prevChildren.length > nextChildren.length) {
    container.removeChild(prevChildren.pop());
  }

  function createDom(element) {
    const dom =
      element.type === 'TEXT_ELEMENT'
        ? document.createTextNode(element.props.nodeValue)
        : document.createElement(element.type);
    Object.keys(element.props).forEach((key) => {
      if (isChildren(key)) {
        element.props[key].forEach((child) => {
          dom.appendChild(createDom(child));
        });
      }
      if (isStyle(key)) {
        dom.style[key] = element.props[key];
      }
      if (isProperty(key)) {
        dom[key] = element.props[key];
      }
      if (isEvent(key)) {
        const eventType = key.toLowerCase().substring(2);
        dom.addEventListener(eventType, dom.props[key]);
      }
    });
    return dom;
  }
}

export function useStateImpl(initial) {
  const oldHook =
    internals.wipFiber.alternate &&
    internals.wipFiber.alternate.hooks &&
    internals.wipFiber.alternate.hooks[internals.hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    hook.queue.push(action);
    internals.wipRoot = {
      dom: internals.currentRoot.dom,
      props: internals.currentRoot.props,
      alternate: internals.currentRoot,
    };
    internals.nextUnitOfWork = internals.wipRoot;
    internals.deletions = [];
  };

  internals.wipFiber.hooks.push(hook);
  internals.hookIndex++;
  return [hook.state, setState];
}
