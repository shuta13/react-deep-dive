'use strict';

function workLoop(deadline, commitRoot, performUnitOfWork, internals) {
  let shouldYield = false;
  while (internals.nextUnitOfWork && !shouldYield) {
    internals.nextUnitOfWork = performUnitOfWork(
      internals.nextUnitOfWork,
      internals
    );
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!internals.nextUnitOfWork && internals.wipRoot) {
    commitRoot(internals);
  }

  requestIdleCallback((deadline) =>
    workLoop(deadline, commitRoot, performUnitOfWork, internals)
  );
}

export function scheduleCallback(commitRoot, performUnitOfWork, internals) {
  requestIdleCallback((deadline) =>
    workLoop(deadline, commitRoot, performUnitOfWork, internals)
  );
}
