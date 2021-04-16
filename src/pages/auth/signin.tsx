import React, { FC, useCallback } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import { Space } from 'components-ui/space';
import { Form } from 'components-ui/form/form';
import { Block } from 'components-ui/block';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import * as URL from 'core/url';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { signIn } from 'redux/slices/auth-slice';

import './auth.scss';

const PageSignIn: FC = () => {
  const location = useLocation();
  const actionSignIn = useBoundAction(signIn);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const authError = useAppSelector((state) => state.auth.error.auth);

  const signInFields = [
    {
      placeholder: 'Login',
      type: 'text',
      name: 'login',
      defaultValue: '',
    },
    {
      placeholder: 'Password',
      type: 'password',
      name: 'password',
      defaultValue: '',
    },
  ];

  const onSubmit = useCallback(
    async (info: SignInRequestInfo) => {
      actionSignIn(info);
    },
    [actionSignIn]
  );

  const validation = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.login) {
      errors.login = validationMessages.isRequire;
    } else if (!isValidLogin(values.login)) {
      errors.login = validationMessages.invalidFormat;
    }
    if (!values.password) {
      errors.password = validationMessages.isRequire;
    } else if (!isValidPassword(values.password)) {
      errors.password = validationMessages.passwordLength;
    }
    return errors;
  };

  const fromUrl = location.state?.from
    ? location.state.from.pathname + location.state.from.search
    : undefined;

  if (currentUser) {
    return <Redirect to={fromUrl || URL.HOME} />;
  }

  return (
    <Space>
      <Block style={{ width: '400px', height: '320px' }}>
        <Form
          onSubmit={onSubmit}
          fields={signInFields}
          validation={validation}
          buttonText="Войти"
          title="Tower Defence"
        />
        {authError && <div className="auth-error">{authError.message}</div>}
      </Block>
    </Space>
  );
};

export { PageSignIn };
export default PageSignIn;
