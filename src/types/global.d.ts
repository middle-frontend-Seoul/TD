declare module '*.png' {
  const value: string;
  export default value;
}

// declare module 'http-proxy-middleware';

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

type AppUrls = {
  [name: string]: {
    path: string;
    exact?: boolean;
    protected?: boolean;
    fetchData?: (dispatch: any) => Promise<void>;
  };
};
