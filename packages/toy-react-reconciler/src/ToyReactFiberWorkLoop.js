// @ts-check
'use strict';

import ToyReactSharedInternals from 'toy-shared/ToyReactSharedInternals';
import {
  DiscreteEventPriority,
  DefaultEventPriority,
  getCurrentUpdatePriority,
  setCurrentUpdatePriority,
  lanesToEventPriority,
  lowerEventPriority,
} from './ToyReactEventPriorities';
import {
  claimNextTransitionLane,
  getHighestPriorityLane,
  getNextLanes,
  markRootSuspended,
  markRootUpdated,
  markStarvedLanesAsExpired,
  mergeLanes,
  NoLane,
  NoLanes,
  NoTimestamp,
  pickArbitraryLane,
  SyncLane,
} from './ToyReactFiberLane';
import {
  flushSyncCallbacks,
  flushSyncCallbacksOnlyInLegacyMode,
} from './ToyReactFiberSyncTaskQueue';
import {
  commitPassiveMountEffects,
  commitPassiveUnmountEffects,
} from './ToyReactFiberCommitWork';
import { cancelCallback, now } from './Scheduler';
import { ConcurrentMode, NoMode } from './ToyReactTypeOfMode';
import {
  NoTransition,
  requestCurrentTransition,
} from './ToyReactFiberTransition';
import { HostRoot } from './ToyReactWorkTags';

// https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/react-reconciler/src/ReactRootTags.js#L12
const LegacyRoot = 0;

// https://github.com/facebook/react/blob/19092ac8c354b92c2e0e27b73f391571ad452505/packages/shared/ReactFeatureFlags.js#L163
const deferRenderPhaseUpdateToNextBatch = false;

export const NoContext = 0b0000;
const BatchedContext = 0b0001;
const RenderContext = 0b0010;
const CommitContext = 0b0100;

const RootIncomplete = 0;
const RootSuspendedWithDelay = 4;

let executionContext = NoContext;
let workInProgressRoot = null;

let workInProgressRootRenderLanes = NoLanes;

let rootWithPendingPassiveEffects = null;
let pendingPassiveEffectsLanes = NoLanes;

let nestedPassiveUpdateCount = 0;

const { ToyReactCurrentBatchConfig, ToyReactCurrentActQueue } =
  ToyReactSharedInternals;

const NESTED_UPDATE_LIMIT = 50;
let nestedUpdateCount = 0;
let rootWithNestedUpdates = null;

let currentEventTime = NoTimestamp;
let currentEventTransitionLane = NoLanes;

let workInProgressRootExitStatus = RootIncomplete;
let workInProgressRootUpdatedLanes = NoLanes;
let workInProgressRootRenderTargetTime = Infinity;

const RENDER_TIMEOUT_MS = 500;

function resetRenderTimer() {
  workInProgressRootRenderTargetTime = now() + RENDER_TIMEOUT_MS;
}

export function requestEventTime() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    return now();
  }

  if (currentEventTime !== NoTimestamp) {
    return currentEventTime;
  }

  currentEventTime = now();
  return currentEventTime;
}

function ensureRootIsScheduled(root, currentTime) {
  const existingCallbackNode = root.callbackNode;

  markStarvedLanesAsExpired(root, currentTime);

  const nextLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  );

  if (nextLanes === NoLanes) {
    if (existingCallbackNode !== null) {
      cancelCallback(existingCallbackNode);
    }
    root.callbackNode = null;
    root.callbackPriority = NoLane;
    return;
  }

  const newCallbackPriority = getHighestPriorityLane(nextLanes);

  const existingCallbackPriority = root.callbackPriority;

  if (existingCallbackNode != null) {
    cancelCallback(existingCallbackNode);
  }

  let newCallbackNode;
  if (newCallbackPriority === SyncLane) {
  }
}

export function requestUpdateLane(fiber) {
  const mode = fiber.mode;
  if ((mode & ConcurrentMode) === NoMode) {
    return SyncLane;
  } else if (
    !deferRenderPhaseUpdateToNextBatch &&
    (executionContext & RenderContext) !== NoContext &&
    workInProgressRootRenderLanes !== NoLanes
  ) {
    return pickArbitraryLane(workInProgressRootRenderLanes);
  }

  const isTransition = requestCurrentTransition() !== NoTransition;
  if (isTransition) {
    if (currentEventTransitionLane === NoLane) {
      currentEventTransitionLane = claimNextTransitionLane();
    }
    return currentEventTransitionLane;
  }

  const updateLane = getCurrentUpdatePriority();
  if (updateLane !== NoLane) {
    return updateLane;
  }

  const eventLane = getCurrentUpdatePriority();
  return eventLane;
}

export function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  checkForNestedUpdates();

  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
  if (root === null) {
    return;
  }

  markRootUpdated(root, lane, eventTime);

  if (root === workInProgressRoot) {
    if (
      deferRenderPhaseUpdateToNextBatch ||
      (executionContext & RenderContext) === NoContext
    ) {
      workInProgressRootUpdatedLanes = mergeLanes(
        workInProgressRootUpdatedLanes,
        lane
      );
    }
    if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
      markRootSuspended(root, workInProgressRootRenderLanes);
    }
  }

  ensureRootIsScheduled(root, eventTime);
  if (
    lane === SyncLane &&
    executionContext === NoContext &&
    !ToyReactCurrentActQueue.isBatchingLegacy
  ) {
    resetRenderTimer();
    flushSyncCallbacksOnlyInLegacyMode();
  }

  return root;
}

export function flushPassiveEffects() {
  if (rootWithPendingPassiveEffects !== null) {
    const renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes);
    const priority = lowerEventPriority(DefaultEventPriority, renderPriority);
    const prevTransition = ToyReactCurrentBatchConfig.transition;
    const previousPriority = getCurrentUpdatePriority();

    try {
      ToyReactCurrentBatchConfig.transition = 0;
      setCurrentUpdatePriority(priority);
      return flushPassiveEffectsImpl();
    } finally {
      setCurrentUpdatePriority(previousPriority);
      ToyReactCurrentBatchConfig.transition = prevTransition;
    }
  }

  return false;
}

export function flushSyncWithoutWarningIfAlreadyRendering(fn) {
  if (
    rootWithPendingPassiveEffects !== null &&
    rootWithPendingPassiveEffects.tag === LegacyRoot &&
    (executionContext & (RenderContext | CommitContext)) === NoContext
  ) {
    flushPassiveEffects();
  }

  const prevExecutionContext = executionContext;
  executionContext |= BatchedContext;

  const prevTransition = ToyReactCurrentBatchConfig.transition;
  const previousPriority = getCurrentUpdatePriority();
  try {
    ToyReactCurrentBatchConfig.transition = 0;
    setCurrentUpdatePriority(DiscreteEventPriority);
    if (fn) {
      return fn();
    } else {
      return undefined;
    }
  } finally {
    setCurrentUpdatePriority(previousPriority);
    ToyReactCurrentBatchConfig.transition = prevTransition;
    executionContext = prevExecutionContext;
    if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
      flushSyncCallbacks();
    }
  }
}

function markUpdateLaneFromFiberToRoot(sourceFiber, lane) {
  sourceFiber.lanes = mergeLanes(sourceFiber.lanes, lane);
  let alternate = sourceFiber.alternate;
  if (alternate !== null) {
    alternate.lanes = mergeLanes(alternate.lanes, lane);
  }

  let node = sourceFiber;
  let parent = sourceFiber.return;
  while (parent !== null) {
    parent.childLanes = mergeLanes(parent.childLanes, lane);
    alternate = parent.alternate;
    if (alternate !== null) {
      alternate.childLanes = mergeLanes(alternate.childLanes, lane);
    }

    node = parent;
    parent = parent.return;
  }
  if (node.tag === HostRoot) {
    const root = node.stateNode;
    return root;
  } else {
    return null;
  }
}

export function isInterleavedUpdate(fiber, lane) {
  return (
    workInProgressRoot !== null &&
    (fiber.mode & ConcurrentMode) !== NoMode &&
    (deferRenderPhaseUpdateToNextBatch ||
      (executionContext & RenderContext) === NoContext)
  );
}

function flushPassiveEffectsImpl() {
  if (rootWithPendingPassiveEffects === null) {
    return false;
  }

  const root = rootWithPendingPassiveEffects;
  // const lanes = pendingPassiveEffectsLanes;
  rootWithPendingPassiveEffects = null;
  pendingPassiveEffectsLanes = NoLanes;

  const prevExecutionContext = executionContext;
  executionContext |= CommitContext;

  commitPassiveUnmountEffects(root.current);
  commitPassiveMountEffects(root, root.current);

  executionContext = prevExecutionContext;

  flushSyncCallbacks();

  nestedPassiveUpdateCount =
    rootWithPendingPassiveEffects === null ? 0 : nestedPassiveUpdateCount + 1;

  // onPostCommitRootDevTools(root);

  return true;
}

function checkForNestedUpdates() {
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    nestedUpdateCount = 0;
    rootWithNestedUpdates = null;
  }
}
