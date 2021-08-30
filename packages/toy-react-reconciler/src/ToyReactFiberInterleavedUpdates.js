// @ts-check
'use strict';

let interleavedQueues = null;

export function pushInterleavedQueue(queue) {
  if (interleavedQueues === null) {
    interleavedQueues = [queue];
  } else {
    interleavedQueues.push(queue);
  }
}
