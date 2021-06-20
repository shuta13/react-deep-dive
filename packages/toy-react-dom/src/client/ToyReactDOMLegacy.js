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
  internals.nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };

  flushSync(internals);
}

export function useStateImpl(initial) {}
