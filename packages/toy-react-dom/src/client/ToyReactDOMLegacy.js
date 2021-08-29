// @ts-check
'use strict';

import {
  createContainer,
  updateContainer,
  flushSyncWithoutWarningIfAlreadyRendering,
  getPublicRootInstance,
  // @ts-ignore
} from 'toy-react-reconciler';
import { listenToAllSupportedEvents } from '../events/DOMPluginEventSystem';

// https://github.com/facebook/react/blob/860f673a7a6bf826010d41de2f66de62171ab676/packages/react-reconciler/src/ReactRootTags.js#L12
const LegacyRoot = 0;

// https://github.com/facebook/react/blob/19092ac8c354b92c2e0e27b73f391571ad452505/packages/react-dom/src/shared/HTMLNodeType.js#L16
const COMMENT_NODE = 8;

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  if (!forceHydrate) {
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }

  const root = createContainer(
    container,
    LegacyRoot,
    forceHydrate,
    null, // hydrationCallbacks
    false, // isStrictMode
    false // concurrentUpdatesByDefaultOverride,
  );

  const rootContainerElement =
    container.nodeType === COMMENT_NODE ? container.parentNode : container;
  listenToAllSupportedEvents(rootContainerElement);

  return root;
}

function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  let root = container._toyReactRootContainer;
  let fiberRoot;

  if (!root) {
    root = container._toyReactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    fiberRoot = root;

    console.dir(fiberRoot);

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

export function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  );
}
