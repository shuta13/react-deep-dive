// @ts-check
'use strict';

let getCurrentTime;
const hasPerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

if (hasPerformanceNow) {
  const localPerformance = performance;
  getCurrentTime = () => localPerformance.now();
} else {
  const localDate = Date;
  const initialTime = localDate.now();
  getCurrentTime = () => localDate.now() - initialTime;
}

function unstable_cancelCallback(task) {
  task.callback = null;
}

export { unstable_cancelCallback, getCurrentTime as unstable_now };
