import React, { FC } from 'react';
import { Space } from 'components-ui/space';
import './auth.scss';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from 'components-ui/block';
import { authApi } from 'api/auth-api';
import {
  isPasswordEqual,
  isValidEmail,
  isValidLogin,
  isValidPassword,
  validationMessages,
} from 'utils/validation';

const PageSignUp: FC = () => {
  const history = useHistory();
  const [signUpError, setSignUpError] = React.useState('');
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

  const signUp = React.useCallback(
    (info: SignUpRequestInfo) => {
      authApi.signUp(info).then(({ data, error }) => {
        if (data) {
          history.push({
            pathname: '/',
          });
        } else if (error?.response) {
          setSignUpError(error.response.data.reason);
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
          onSubmit={signUp}
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
