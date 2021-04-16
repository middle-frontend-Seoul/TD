import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUrlParams } from 'hooks/use-url-params';

export const useUrlNextPage = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useUrlParams();

  return useCallback(
    (page: number | string) => {
      params.set('page', String(page));
      const url = [location.pathname, params.toString()].join('?');
      history.push(url);
    },
    [history, location, params]
  );
};
