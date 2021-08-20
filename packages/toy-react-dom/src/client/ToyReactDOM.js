// @ts-check
'use strict';

import {
  updateContainer,
  flushSyncWithoutWarningIfAlreadyRendering,
  getPublicRootInstance,
} from 'toy-react-reconciler';

function createRootFromDOMContainer(container, forceHydrate) {}

/**
 * @param {*} parentComponent
 * @param {*} children
 * @param {*} container
 * @param {boolean} forceHydrate
 * @param {Function=} callback
 * @returns
 */
function renderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  let root = container._toyReactRootContainer;
  let fiberRoot;

  if (!root) {
    root = container._toyReactRootContainer = createRootFromDOMContainer(
      container,
      forceHydrate
    );
    fiberRoot = root;

    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }

    flushSyncWithoutWarningIfAlreadyRendering(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root;

    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }

    updateContainer(children, fiberRoot, parentComponent, callback);
  }

  return getPublicRootInstance(fiberRoot);
}

/**
 * @param {*} element
 * @param {*} container
 * @param {Function=} callback
 * @returns
 */
export function render(element, container, callback) {
  return renderSubtreeIntoContainer(null, element, container, false, callback);
}
