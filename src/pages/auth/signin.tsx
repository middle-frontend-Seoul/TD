import React, { FC, useCallback, useEffect } from 'react';

import { Space } from 'components-ui/space';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from 'components-ui/block';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { signIn } from 'redux/slices/auth-slice';

import './auth.scss';

const PageSignIn: FC = () => {
  const history = useHistory();
  const actionSignIn = useBoundAction(signIn);
  const authError = useAppSelector((state) => state.auth.error);
  const authStatus = useAppSelector((state) => state.auth.authStatus);

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

  useEffect(() => {
    if (authStatus === 'success') {
      history.push({
        pathname: '/',
      });
    }
  }, [actionSignIn, authStatus, history]);

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
