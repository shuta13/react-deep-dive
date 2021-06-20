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

export function useStateImpl(initial) {}
