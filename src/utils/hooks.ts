import { useEffect } from 'react';

// https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
// useMountEffect hook
export const useMountEffect = (
  effectCallback: () => (() => void) | void
): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectCallback, []);
};
