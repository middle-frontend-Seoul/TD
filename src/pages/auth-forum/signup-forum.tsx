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
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { signUp } from 'rdx/slices/auth-forum-slice';
import { withAuth } from './with-auth';

import './auth.scss';

const PageForumSignUp: FC = withAuth(() => {
  const actionSignUp = useBoundAction(signUp);
  const authError = useAppSelector((state) => state.authForum.error.auth);

  const signUpFields = [
    {
      placeholder: 'Username',
      type: 'text',
      name: 'username',
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
      name: 'repeatedPassword',
      defaultValue: '',
    },
  ];

  const onSubmit = useCallback(
    async (info: ForumSignUpRequestInfo) => {
      actionSignUp(info);
    },
    [actionSignUp]
  );

  const validation = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.username) {
      errors.username = validationMessages.isRequire;
    } else if (!isValidLogin(values.username)) {
      errors.username = validationMessages.invalidFormat;
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
    if (!values.repeatedPassword) {
      errors.repeatedPassword = validationMessages.isRequire;
    } else if (!isPasswordEqual(values.password, values.repeatedPassword)) {
      errors.repeatedPassword = validationMessages.noEqualPasswords;
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
          title="FORUM Tower Defense"
        />
        {authError && <div className="auth-error">{authError.message}</div>}
      </Block>
    </Space>
  );
});

export { PageForumSignUp };
export default PageForumSignUp;
