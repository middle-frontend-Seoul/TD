import React, { FC } from 'react';

import { authApi } from 'api/auth-api';
import { useMountEffect } from 'utils/hooks';

const PageSignin: FC = () => {
  useMountEffect(() => {
    authApi.login().then(({ data, error }) => console.log(data, error));
  });

  return <>PageSignin</>;
};

export { PageSignin };
export default PageSignin;
