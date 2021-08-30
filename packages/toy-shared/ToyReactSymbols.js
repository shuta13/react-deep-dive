'use strict';
/**
 * @see https://github.com/facebook/react/blob/4ecf11977c46966d3deedcdc71f1280a34607d1d/packages/shared/ReactSymbols.js
 */

export let TOY_REACT_ELEMENT_TYPE = 0xeac7;

if (typeof Symbol === 'function' && Symbol.for) {
  const symbolFor = Symbol.for;
  TOY_REACT_ELEMENT_TYPE = symbolFor('react.element');
}
