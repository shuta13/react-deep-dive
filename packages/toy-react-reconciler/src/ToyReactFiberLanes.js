// @ts-check
'use strict';
/**
 * @see https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/react-reconciler/src/ReactFiberLane.old.js
 */

export const NoLanePriority = 0;

export const TotalLanes = 31;

export const NoLanes = 0b0000000000000000000000000000000;

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
