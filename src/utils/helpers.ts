export function simpleThrottle(
  callback: (...args: any[]) => void,
  throttlePeriod: number
) {
  let isWait = false;
  return function throttled(...args: any[]) {
    if (!isWait) {
      callback.call(null, ...args);
      isWait = true;
      setTimeout(() => {
        isWait = false;
      }, throttlePeriod);
    }
  };
}
