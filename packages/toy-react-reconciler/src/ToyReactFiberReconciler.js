'use strict';

function isEvent(key) {}
function isStyle(key) {}
function isProperty(key) {
  return key !== 'children';
}
function isNew(prev, next) {}
function isGone(prev, next) {}

export function updateDom(dom, prevProps, nextProps) {}

export function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}
