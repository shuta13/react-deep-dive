'use strict';

import { flushSync } from 'toy-react-reconciler/src/ToyReactFiberWorkLoop';

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
