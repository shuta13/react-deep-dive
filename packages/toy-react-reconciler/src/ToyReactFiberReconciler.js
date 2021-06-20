'use strict';

export { flushSync } from './ToyReactFiberWorkLoop';

function isEvent(key) {
  return key.startsWith('on');
}
function isStyle(key) {
  return key === 'style';
}
function isProperty(key) {
  return key !== 'children' && !isEvent(key) && !isStyle(key);
}
function isNew(prev, next) {
  return function (key) {
    return prev[key] !== next[key];
  };
}
function isGone(prev, next) {
  return function (key) {
    return !(key in next);
  };
}

export function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = '';
    });

  // Remove old styles
  const prevStyles = prevProps.style || {};
  const nextStyles = nextProps.style || {};
  Object.keys(prevStyles)
    .filter(isGone(prevStyles, nextStyles))
    .forEach((name) => {
      dom.style[name] = '';
    });

  // Set new or changed styles
  Object.keys(nextStyles)
    .filter(isNew(prevStyles, nextStyles))
    .forEach((name) => {
      dom.style[name] = nextStyles[name];
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

export function createDom(fiber) {
  if (!fiber) {
    return;
  }

  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
}
