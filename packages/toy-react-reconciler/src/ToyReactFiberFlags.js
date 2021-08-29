'use strict';
/**
 * @see https://github.com/facebook/react/blob/fc3b6a4118de30ae76f67c2be3d463679c11f4b7/packages/react-reconciler/src/ReactFiberFlags.js
 */

export const NoFlags = /*                      */ 0b00000000000000000000000;

export const ChildDeletion = /*                */ 0b00000000000000000010000;
export const Passive = /*                      */ 0b00000000000010000000000;

export const PassiveMask = Passive | ChildDeletion;
