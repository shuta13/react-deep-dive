// @ts-check
'use strict';

import { createHostRootFiber } from './ToyReactFiber';
import { noTimeout } from './ToyReactFiberHostConfig';
import {
  createLaneMap,
  NoLane,
  NoLanes,
  NoTimestamp,
} from './ToyReactFiberLane';
import { initializeUpdateQueue } from './ToyReactUpdateQueue';

// https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/shared/ReactFeatureFlags.js#L88
// const enableSuspenseCallback = false;

// https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/shared/ReactFeatureFlags.js#L63
// related: https://github.com/facebook/react/pull/17071
// const enableCache = false;

function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.current = null;
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.expirationTimes = createLaneMap(NoTimestamp);

  this.pendingLanes = NoLanes;
  this.suspendedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.finishedLanes = NoLanes;

  this.entangledLanes = NoLanes;
  this.entanglements = createLaneMap(NoLanes);

  // if (enableCache) {
  //   this.pooledCache = null;
  //   this.pooledCacheLanes = NoLanes;
  // }

  // if (supportsHydration) {
  //   this.mutableSourceEagerHydrationData = null;
  // }

  // if (enableSchedulerTracing) {
  //   this.interactionThreadID = unstable_getThreadID();
  //   this.memoizedInteractions = new Set();
  //   this.pendingInteractionMap = new Map();
  // }
  // if (enableSuspenseCallback) {
  //   this.hydrationCallbacks = null;
  // }
}

export function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  const root = new FiberRootNode(containerInfo, tag, hydrate);

  // if (enableSuspenseCallback) {
  //   root.hydrationCallbacks = hydrationCallbacks;
  // }

  const uninitializedFiber = createHostRootFiber(
    tag,
    isStrictMode,
    concurrentUpdatesByDefaultOverride
  );
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  // if (enableCache) {
  //   const initialCache = new Map();
  //   root.pooledCache = initialCache;
  //   const initialState = {
  //     element: null,
  //     cache: initialCache,
  //   };
  //   uninitializedFiber.memoizedState = initialState;
  // } else {
  //   const initialState = {
  //     element: null,
  //   };
  //   uninitializedFiber.memoizedState = initialState;
  // }

  initializeUpdateQueue(uninitializedFiber);

  return root;
}
