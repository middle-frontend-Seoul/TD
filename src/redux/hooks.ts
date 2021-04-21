import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBoundAction: UseBoundAction = (
  actionCreator: (...args: any[]) => any // eslint-disable-line
) => {
  const dispatch = useAppDispatch();

  return useCallback((...arg) => dispatch(actionCreator(...arg)), [
    dispatch,
    actionCreator,
  ]);
};
