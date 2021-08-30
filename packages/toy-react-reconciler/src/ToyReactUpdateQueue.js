// @ts-check
'use strict';

import { pushInterleavedQueue } from './ToyReactFiberInterleavedUpdates';
import {
  intersectLanes,
  isTransitionLane,
  markRootEntangled,
  mergeLanes,
  NoLanes,
} from './ToyReactFiberLane';
import { isInterleavedUpdate } from './ToyReactFiberWorkLoop';

export const UpdateState = 0;

export function initializeUpdateQueue(fiber) {
  const queue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: NoLanes,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
}

export function createUpdate(eventTime, lane) {
  const update = {
    eventTime,
    lane,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
  return update;
}

export function enqueueUpdate(fiber, update, lane) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return;
  }

  const sharedQueue = updateQueue.shared;

  if (isInterleavedUpdate(fiber, lane)) {
    const interleaved = sharedQueue.interleaved;
    if (interleaved === null) {
      update.next = update;
      pushInterleavedQueue(sharedQueue);
    } else {
      update.next = interleaved.next;
      interleaved.next = update;
    }
    sharedQueue.interleaved = update;
  } else {
    const pending = sharedQueue.pending;
    if (pending === null) {
      update.next = update;
    } else {
      update.next = pending.next;
      pending.next = update;
    }
    sharedQueue.pending = update;
  }
}

export function entangleTransitions(root, fiber, lane) {
  const updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return;
  }

  const sharedQueue = updateQueue.shared;
  if (isTransitionLane(lane)) {
    let queueLanes = sharedQueue.lanes;

    queueLanes = intersectLanes(queueLanes, root.pendingLanes);

    const newQueueLanes = mergeLanes(queueLanes, lane);
    sharedQueue.lanes = newQueueLanes;
    markRootEntangled(root, newQueueLanes);
  }
}
