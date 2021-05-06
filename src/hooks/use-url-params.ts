import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useUrlParams = (): URLSearchParams => {
  const location = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params;
  }, [location]);
};
