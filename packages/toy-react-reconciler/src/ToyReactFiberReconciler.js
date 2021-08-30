// @ts-check
'use strict';

import { getPublicInstance } from './ToyReactFiberHostConfig';
import { createFiberRoot } from './ToyReactFiberRoot';
import { HostComponent } from './ToyReactWorkTags';
import {
  requestEventTime,
  requestUpdateLane,
  scheduleUpdateOnFiber,
} from './ToyReactFiberWorkLoop';
import {
  createUpdate,
  enqueueUpdate,
  entangleTransitions,
} from './ToyReactUpdateQueue';
import { emptyContextObject } from './ToyReactFiberContext';

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyContextObject;
  }
}

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

export function updateContainer(element, container, parentComponent, callback) {
  const current = container.current;
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(current);

  const context = getContextForSubtree(parentComponent);

  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  const update = createUpdate(eventTime, lane);
  update.payload = { element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  enqueueUpdate(current, update, lane);
  const root = scheduleUpdateOnFiber(current, lane, eventTime);
  if (root !== null) {
    entangleTransitions(root, current, lane);
  }

  return lane;
}

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
