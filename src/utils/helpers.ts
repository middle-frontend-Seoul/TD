export function simpleThrottle(
  callback: (...args: any[]) => void, // eslint-disable-line
  throttlePeriod: number
) {
  let isWait = false;
  return function throttled(...args: any[]) { // eslint-disable-line
    if (!isWait) {
      callback.call(null, ...args);
      isWait = true;
      setTimeout(() => {
        isWait = false;
      }, throttlePeriod);
    }
  };
}
