import React, { FC } from 'react';
import { Space } from 'components-ui/space';
import './signup.scss';
import { Form } from 'components-ui/form/form';
import { useHistory } from 'react-router';
import { Block } from '../../components-ui/block';
import { authApi } from '../../api/auth-api';

const PageSignup: FC = () => {
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

  const signUp = (data: any) => {
    authApi.signUp(data).then((response) => {
      if (response.data) {
        history.push({
          pathname: '/',
        });
      }
      // вот здесь хотелось бы получить данные об ошибке из
      // response.error.response.data.reason
      // но Property 'response' does not exist on type 'Error'.
      setSignUpError('');
    });
  };

  const validation = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.login) {
      errors.login = 'Required';
    } else if (!/^[A-Za-z0-9]*$/.test(values.login)) {
      errors.login = `Invalid login`;
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (!/^.{5,}$/.test(values.password)) {
      errors.password = 'Minimum 5 characters';
    }
    if (!values.passwordRepeated) {
      errors.passwordRepeated = 'Required';
    } else if (values.passwordRepeated !== values.password) {
      errors.passwordRepeated = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <Space>
      <Block style={{ width: '400px', height: '420px' }}>
        <Form onSubmit={signUp} fields={signUpFields} validation={validation} />
        {signUpError && <div>{signUpError}</div>}
      </Block>
    </Space>
  );
};

export { PageSignup };
export default PageSignup;
