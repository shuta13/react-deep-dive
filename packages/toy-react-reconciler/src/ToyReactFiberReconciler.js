// @ts-check
'use strict';

import { getPublicInstance } from './ToyReactFiberHostConfig';
import { createFiberRoot } from './ToyReactFiberRoot';
import { HostComponent } from './ToyReactWorkTags';

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
