'use strict';

// https://github.com/facebook/react/blob/4ecf11977c46966d3deedcdc71f1280a34607d1d/packages/react-reconciler/src/ReactWorkTags.js#L42
const HostComponent = 5;

// https://github.com/facebook/react/blob/9e8fe11e118c07713c7af4458b70aae57c889394/packages/react-dom/src/client/ReactDOMHostConfig.js#L218
function getPublicInstance(instance) {
  return instance;
}

export function updateContainer(
  element,
  container,
  parentComponent,
  callback
) {}

export { flushSyncWithoutWarningIfAlreadyRendering } from './ToyReactFiberWorkLoop';

export function getPublicRootInstance(container) {
  const containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}
