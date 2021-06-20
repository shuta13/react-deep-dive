'use strict';

import { scheduleCallback } from './ToyScheduler';
import { commitWork } from './ToyReactFiberCommitWork';
import {
  updateFunctionComponent,
  updateHostComponent,
} from './ToyReactFiberBeginWork';

function performUnitOfWork(fiber, internals) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber, internals);
  } else {
    updateHostComponent(fiber, internals);
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function commitRoot(internals) {
  internals.deletions.forEach(commitWork);
  commitWork(internals.wipRoot.child);
  internals.currentRoot = internals.wipRoot;
  internals.wipRoot = null;
}

export function flushSync(internals) {
  scheduleCallback(commitRoot, performUnitOfWork, internals);
}
