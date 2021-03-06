import React, { FC, useCallback, useEffect } from 'react';

import { getLanguage } from 'languages';
import { Space } from 'components-ui/space';
import { Link } from 'components-ui/link';
import { Form } from 'components-ui/form/form';
import { Block } from 'components-ui/block';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { signIn } from 'rdx/slices/auth-slice';
import { URL } from 'core/url';
import yaLogo from 'images/tools/ya-logo.png';
import { useHistory } from 'react-router-dom';
import { oAuthApi } from 'api/oauth-api';
import { withAuth } from './with-auth';

import './auth.scss';

const redirectUri = process.env.REDIRECT_URI;

const PageSignIn: FC = withAuth(() => {
  const actionSignIn = useBoundAction(signIn);
  const authError = useAppSelector((state) => state.auth.error.auth);
  const history = useHistory();

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

  const postCode = async (code: string) => {
    await oAuthApi.signIn({
      code,
      redirect_uri: `${redirectUri}`,
    });
  };

  const getCode = useCallback(() => {
    if (history?.location?.state?.from?.search) {
      const params = new URLSearchParams(history.location.state.from.search);
      return params.get('code');
    }
    return null;
  }, [history]);

  useEffect(() => {
    const code = getCode();
    if (code) {
      postCode(code).then(() => {
        document.location.href = `${redirectUri}`;
      });
    }
  }, [getCode]);

  const getCodeOAuth = async () => {
    const { data, error } = await oAuthApi.getClientID();
    if (data) {
      const clientId = data.service_id;
      const urlAuth = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      document.location.href = urlAuth;
    } else {
      throw error;
    }
  };

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
      <Block
        className="signInBLock"
        style={{ width: '400px', height: '320px', position: 'relative' }}
      >
        <Form
          onSubmit={onSubmit}
          fields={signInFields}
          validation={validation}
          buttonText="??????????"
          title="Tower Defense"
        />
        {authError && <div className="auth-error">{authError.message}</div>}
        <Link to={URL.SIGNUP.path} className="auth-link">
          {getLanguage('SIGNUP', '????????????????????????????????????')}
        </Link>
        <div
          onKeyDown={getCodeOAuth}
          role="button"
          tabIndex={0}
          className="auth-oauth"
          onClick={getCodeOAuth}
        >
          <img alt="" src={yaLogo} width="40px" height="40px" />
        </div>
      </Block>
    </Space>
  );
});

export { PageSignIn };
export default PageSignIn;
