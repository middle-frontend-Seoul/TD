import React, { FC, useCallback } from 'react';

import { Space } from 'components-ui/space';
import { Form } from 'components-ui/form/form';
import { Block } from 'components-ui/block';
import {
  isPasswordEqual,
  isValidEmail,
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { signUp } from 'redux/slices/auth-slice';
import { withAuth } from './with-auth';

import './auth.scss';

const PageSignUp: FC = withAuth(() => {
  const actionSignUp = useBoundAction(signUp);
  const authError = useAppSelector((state) => state.auth.error.auth);

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
      actionSignUp(info);
    },
    [actionSignUp]
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
        {authError && <div className="auth-error">{authError.message}</div>}
      </Block>
    </Space>
  );
});

export { PageSignUp };
export default PageSignUp;
