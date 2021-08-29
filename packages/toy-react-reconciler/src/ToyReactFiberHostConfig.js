'use strict';

/**
 * NOTE: This file is provided for compatibility purposes only.
 * @see https://github.com/facebook/react/blob/5c6543771b7fe7ca37ab4b4419a7f873e0849cfb/packages/react-dom/src/client/ReactDOMHostConfig.js
 */

export function getPublicInstance(instance) {
  return instance;
}

export const noTimeout = -1;

// https://github.com/facebook/react/blob/25bfa287f6c49950d8ea16f542716835683442d6/packages/react-dom/src/client/ReactDOMComponentTree.js#L46
const randomKey = Math.random().toString(36).slice(2);
const internalInstanceKey = '__reactFiber$' + randomKey;
const internalPropsKey = '__reactProps$' + randomKey;
//
const internalEventHandlersKey = '__reactEvents$' + randomKey;
const internalEventHandlerListenersKey = '__reactListeners$' + randomKey;
const internalEventHandlesSetKey = '__reactHandles$' + randomKey;
export function detachDeletedInstance(node) {
  delete node[internalInstanceKey];
  delete node[internalPropsKey];
  delete node[internalEventHandlersKey];
  delete node[internalEventHandlerListenersKey];
  delete node[internalEventHandlesSetKey];
}
