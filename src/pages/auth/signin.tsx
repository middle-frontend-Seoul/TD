import React, { FC, useCallback, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { Space } from 'components-ui/space';
import './auth.scss';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from 'components-ui/block';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppDispatch } from 'redux/hooks';
import { signIn } from 'redux/slices/authSlice';

const PageSignIn: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [signInError, setSignInError] = useState('');
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
      try {
        const resultAction = await dispatch(signIn(info));
        unwrapResult(resultAction);
        history.push({
          pathname: '/',
        });
      } catch (error) {
        setSignInError(error.response?.data.reason);
      }
    },
    [dispatch, history, setSignInError]
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
        {signInError && <div className="auth-error">{signInError}</div>}
      </Block>
    </Space>
  );
};

export { PageSignIn };
export default PageSignIn;
