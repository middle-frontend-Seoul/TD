import React, { FC, useState, useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { Space } from 'components-ui/space';
import './auth.scss';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from 'components-ui/block';
import {
  isPasswordEqual,
  isValidEmail,
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppDispatch } from 'redux/hooks';
import { signUp } from 'redux/slices/authSlice';

const PageSignUp: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [signUpError, setSignUpError] = useState('');
  const signUpFields = [
    {
      placeholder: 'Login',
      type: 'text',
      name: 'login',
      defaultValue: '',
    },
    {
      placeholder: 'Email',
      type: 'text',
      name: 'email',
      defaultValue: '',
    },
    {
      placeholder: 'Password',
      type: 'password',
      name: 'password',
      defaultValue: '',
    },
    {
      placeholder: 'Repeat password',
      type: 'password',
      name: 'passwordRepeated',
      defaultValue: '',
    },
  ];

  const onSubmit = useCallback(
    async (info: SignUpRequestInfo) => {
      try {
        const resultAction = await dispatch(signUp(info));
        unwrapResult(resultAction);
        history.push({
          pathname: '/',
        });
      } catch (error) {
        setSignUpError(error.response?.data.reason);
      }
    },
    [dispatch, history, setSignUpError]
  );

  const validation = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.login) {
      errors.login = validationMessages.isRequire;
    } else if (!isValidLogin(values.login)) {
      errors.login = validationMessages.invalidFormat;
    }
    if (!values.email) {
      errors.email = validationMessages.isRequire;
    } else if (!isValidEmail(values.email)) {
      errors.email = validationMessages.invalidFormat;
    }
    if (!values.password) {
      errors.password = validationMessages.isRequire;
    } else if (!isValidPassword(values.password)) {
      errors.password = validationMessages.passwordLength;
    }
    if (!values.passwordRepeated) {
      errors.passwordRepeated = validationMessages.isRequire;
    } else if (!isPasswordEqual(values.password, values.passwordRepeated)) {
      errors.passwordRepeated = validationMessages.noEqualPasswords;
    }
    return errors;
  };

  return (
    <Space>
      <Block style={{ width: '400px', height: '420px' }}>
        <Form
          onSubmit={onSubmit}
          fields={signUpFields}
          validation={validation}
          buttonText="Создать аккаунт"
          title="Tower Defence"
        />
        {signUpError && <div className="auth-error">{signUpError}</div>}
      </Block>
    </Space>
  );
};

export { PageSignUp };
export default PageSignUp;
