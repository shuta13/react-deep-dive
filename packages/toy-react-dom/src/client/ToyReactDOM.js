'use strict';

function render(element, container, callback) {
  console.log('This is render.');
}

function hydrate(element, container, callback) {
  console.log('This is hydrate.');
}

export { render, hydrate };
