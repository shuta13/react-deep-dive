// @ts-check
'use strict';

import { NoLanes } from './ToyReactFiberLanes';

// https://github.com/facebook/react/blob/9e8fe11e118c07713c7af4458b70aae57c889394/packages/react-reconciler/src/ReactWorkTags.js#L40
const HostRoot = 3;

// https://github.com/facebook/react/blob/9e8fe11e118c07713c7af4458b70aae57c889394/packages/react-reconciler/src/ReactTypeOfMode.js#L12
const NoMode = 0b000000;

// https://github.com/facebook/react/blob/a8725a3e628e8e75d408101e5565b2d2af3902c3/packages/react-reconciler/src/ReactFiberFlags.js#L15
const NoFlags = 0b00000000000000000000000;

// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/scripts/rollup/build.js#L405
// related: https://github.com/facebook/react/issues/6627
// const enableProfilerTimer = false;

function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pandingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;

  // if (enableProfilerTimer) {
  //   // Note: The following is done to avoid a v8 performance cliff.
  //   //
  //   // Initializing the fields below to smis and later updating them with
  //   // double values will cause Fibers to end up having separate shapes.
  //   // This behavior/bug has something to do with Object.preventExtension().
  //   // Fortunately this only impacts DEV builds.
  //   // Unfortunately it makes React unusably slow for some applications.
  //   // To work around this, initialize the fields below with doubles.
  //   //
  //   // Learn more about this here:
  //   // https://github.com/facebook/react/issues/14365
  //   // https://bugs.chromium.org/p/v8/issues/detail?id=8538
  //   this.actualDuration = Number.NaN;
  //   this.actualStartTime = Number.NaN;
  //   this.selfBaseDuration = Number.NaN;
  //   this.treeBaseDuration = Number.NaN;

  //   // It's okay to replace the initial doubles with smis after initialization.
  //   // This won't trigger the performance cliff mentioned above,
  //   // and it simplifies other profiler code (including DevTools).
  //   this.actualDuration = 0;
  //   this.actualStartTime = -1;
  //   this.selfBaseDuration = 0;
  //   this.treeBaseDuration = 0;
  // }
}

const createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
};

export function createHostRootFiber(
  tag,
  isStrictMode,
  concurrentUpdatesByDefaultOverride
) {
  const mode = NoMode;

  return createFiber(HostRoot, null, null, mode);
}
