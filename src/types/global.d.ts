declare module '*.png' {
  const value: string;
  export default value;
}

type Nullable<T> = T | null;

interface Window {
  __INITIAL_STATE__: RootState;
}

interface LocationState {
  from: {
    pathname: string;
    search: string;
  };
}
