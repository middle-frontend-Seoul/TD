import React, { FC, useEffect } from 'react';

import { authApi } from 'api/auth-api';

const PageSignin: FC = () => {
  useEffect(() => {
    authApi.login().then(({ data }) => console.log(data));
  }, []);

  return <>PageSignin</>;
};

export { PageSignin };
export default PageSignin;
