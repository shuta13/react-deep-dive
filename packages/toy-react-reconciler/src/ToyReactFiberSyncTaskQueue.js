// @ts-check
'use strict';

import { ImmediatePriority } from '../../toy-scheduler/src/forks/ToySchedulerPriorities';
import { scheduleCallback } from './Scheduler';
import {
  DiscreteEventPriority,
  getCurrentUpdatePriority,
  setCurrentUpdatePriority,
} from './ToyReactEventPriorities';

let syncQueue = null;
let includesLegacySyncCallbacks = false;
let isFlushingSyncQueue = false;

export function flushSyncCallbacksOnlyInLegacyMode() {
  if (includesLegacySyncCallbacks) {
    flushSyncCallbacks();
  }
}

export function flushSyncCallbacks() {
  if (!isFlushingSyncQueue && syncQueue !== null) {
    isFlushingSyncQueue = true;
    let i = 0;
    const previousUpdatePriority = getCurrentUpdatePriority();

    try {
      const isSync = true;
      const queue = syncQueue;
      setCurrentUpdatePriority(DiscreteEventPriority);

      for (; i < queue.length; i++) {
        let callback = queue[i];
        do {
          callback = callback(isSync);
        } while (callback !== null);
      }

      syncQueue = null;
      includesLegacySyncCallbacks = false;
    } catch (error) {
      if (syncQueue !== null) {
        syncQueue = syncQueue.slice(i + 1);
      }

      // TODO: implements ?
      scheduleCallback(ImmediatePriority, flushSyncCallbacks);
      throw error;
    } finally {
      setCurrentUpdatePriority(previousUpdatePriority);
      isFlushingSyncQueue = false;
    }
  }
}
