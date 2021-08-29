// @ts-check
'use strict';
/**
 * @see https://github.com/facebook/react/blob/a8725a3e628e8e75d408101e5565b2d2af3902c3/packages/react-reconciler/src/ReactFiberLane.old.js
 */

export const TotalLanes = 31;

export const NoLanes = /*             */ 0b0000000000000000000000000000000;
export const NoLane = /*              */ 0b0000000000000000000000000000000;

export const SyncLane = /*            */ 0b0000000000000000000000000000001;

export const InputContinuousLane = /* */ 0b0000000000000000000000000000100;

const NonIdleLanes = /*               */ 0b0001111111111111111111111111111;

export const IdleLane = /*            */ 0b0100000000000000000000000000000;

export const DefaultLane = /*         */ 0b0000000000000000000000000010000;

export const NoTimestamp = -1;

export function createLaneMap(initial) {
  // Intentionally pushing one by one.
  // https://v8.dev/blog/elements-kinds#avoid-creating-holes
  const laneMap = [];
  for (let i = 0; i < TotalLanes; i++) {
    laneMap.push(initial);
  }
  return laneMap;
}

export function includesNonIdleWork(lanes) {
  return (lanes & NonIdleLanes) !== NoLanes;
}

export function getHighestPriorityLane(lanes) {
  return lanes & -lanes;
}
