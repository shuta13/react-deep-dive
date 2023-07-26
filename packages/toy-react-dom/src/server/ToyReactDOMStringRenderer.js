'use strict';

import ToyReactPartialRenderer from './ToyReactPartialRenderer';

export function renderToString(element, options) {
  const renderer = new ToyReactPartialRenderer(element, options);
  try {
    const markup = renderer.read();
    return markup;
  } finally {
    renderer.destroy();
  }
}
