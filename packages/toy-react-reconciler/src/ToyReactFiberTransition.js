'use strict';

import ToyReactSharedInternals from 'toy-shared/ToyReactSharedInternals';

const { ToyReactCurrentBatchConfig } = ToyReactSharedInternals;

export const NoTransition = 0;

export function requestCurrentTransition() {
  return ToyReactCurrentBatchConfig.transition;
}
