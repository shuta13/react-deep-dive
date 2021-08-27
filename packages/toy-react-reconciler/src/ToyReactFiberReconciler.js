// @ts-check
'use strict';

import { getPublicInstance } from './ToyReactFiberHostConfig';
import { createFiberRoot } from './ToyReactFiberRoot';

// https://github.com/facebook/react/blob/4ecf11977c46966d3deedcdc71f1280a34607d1d/packages/react-reconciler/src/ReactWorkTags.js#L42
const HostComponent = 5;

export function createContainer(
  containerInfo,
  tag,
  hydrate,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );
}

export function updateContainer(
  element,
  container,
  parentComponent,
  callback
) {}

export { flushSyncWithoutWarningIfAlreadyRendering } from './ToyReactFiberWorkLoop';

export function getPublicRootInstance(container) {
  const containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}
