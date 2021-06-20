'use strict';

import { scheduleCallback } from './ToyScheduler';
import { createDom } from './ToyReactFiberReconciler';
import { commitWork } from './ToyReactFiberCommitWork';
import { reconcileChildren } from './ToyReactFiberBeginWork';

function performUnitOfWork(fiber, internals) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements, internals);

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
