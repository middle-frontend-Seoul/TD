import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { URL } from 'core/url';
import { Space } from 'components-ui/space';
import { Form } from 'components-ui/form/form';
import { Block } from 'components-ui/block';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { signIn } from 'rdx/slices/auth-forum-slice';
import { withAuth } from './with-auth';

import './auth.scss';

const PageForumSignIn: FC = withAuth(() => {
  const actionSignIn = useBoundAction(signIn);
  const authError = useAppSelector((state) => state.authForum.error.auth);

  const signInFields = [
    {
      placeholder: 'Username',
      type: 'text',
      name: 'username',
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
    async (info: ForumSignInRequestInfo) => {
      actionSignIn(info);
    },
    [actionSignIn]
  );

  const validation = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.username) {
      errors.username = validationMessages.isRequire;
    } else if (!isValidLogin(values.username)) {
      errors.username = validationMessages.invalidFormat;
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
      <Block
        className="signInBLock"
        style={{ width: '400px', height: '320px', position: 'relative' }}
      >
        <Form
          onSubmit={onSubmit}
          fields={signInFields}
          validation={validation}
          buttonText="Войти"
          title="FORUM Tower Defense"
        />
        {authError && <div className="auth-error">{authError.message}</div>}
        <Link to={URL.SIGNUP_FORUM.path} className="auth-link">
          Зарегистрироваться
        </Link>
      </Block>
    </Space>
  );
});

export { PageForumSignIn };
export default PageForumSignIn;
