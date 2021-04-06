import React, { FC } from 'react';
import { Space } from 'components-ui/space';
import './auth.scss';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from 'components-ui/block';
import { authApi } from 'api/auth-api';
import {
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';

const PageSignIn: FC = () => {
  const history = useHistory();
  const [signInError, setSignInError] = React.useState('');
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

  const signIn = React.useCallback(
    (info: SignInRequestInfo) => {
      authApi.signIn(info).then(({ data, error }) => {
        if (data) {
          history.push({
            pathname: '/',
          });
        } else if (error?.response) {
          setSignInError(error.response.data.reason);
        }
      });
    },
    [history]
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
          onSubmit={signIn}
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
