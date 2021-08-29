// @ts-check
'use strict';

import ToyReactSharedInternals from 'shared/ToyReactSharedInternals';
import {
  DiscreteEventPriority,
  DefaultEventPriority,
  getCurrentUpdatePriority,
  setCurrentUpdatePriority,
  lanesToEventPriority,
  lowerEventPriority,
} from './ToyReactEventPriorities';
import { NoLane, NoLanes, NoTimestamp, SyncLane } from './ToyReactFiberLanes';
import { flushSyncCallbacks } from './ToyReactFiberSyncTaskQueue';
import {
  commitPassiveMountEffects,
  commitPassiveUnmountEffects,
} from './ToyReactFiberCommitWork';
import { now } from './Scheduler';

// https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/react-reconciler/src/ReactRootTags.js#L12
const LegacyRoot = 0;

export const NoContext = 0b0000;
const BatchedContext = 0b0001;
const RenderContext = 0b0010;
const CommitContext = 0b0100;

let executionContext = NoContext;

let rootWithPendingPassiveEffects = null;
let pendingPassiveEffectsLanes = NoLanes;

let nestedPassiveUpdateCount = 0;

const { ToyReactCurrentBatchConfig } = ToyReactSharedInternals;

let currentEventTime = NoTimestamp;

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
