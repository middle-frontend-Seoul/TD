import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Input } from 'components-ui/input/input';
import { Button } from 'components-ui/button';
import { Title } from 'components-ui/title';
import './form.scss';

type FormField = {
  type?: string;
  name: string;
  defaultValue: string;
  placeholder: string;
};

export interface FormProps<> {
  onSubmit: (values: Record<string, string>) => void;
  fields: Array<FormField>;
  validation: (value: Record<string, string>) => Record<string, string>;
}

export const Form: FC<FormProps> = ({ onSubmit, fields, validation }) => {
  const initVals = fields.reduce(
    (res: Record<string, string>, { name, defaultValue = '' }) => {
      res[name] = defaultValue;
      return res;
    },
    {}
  );

  const signUpForm = useFormik({
    initialValues: initVals,
    validate: validation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={signUpForm.handleSubmit} className="auth-form">
      <Title size="small">Tower Defence</Title>
      {fields.map((field) => (
        <div key={field.name}>
          <Input
            value={signUpForm.values[field.name]}
            onChange={signUpForm.handleChange}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
          />
          {signUpForm.errors[field.name] ? (
            <div className="auth-error">{signUpForm.errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <Button type="submit" use="primary" className="auth-form-button">
        Создать аккаунт
      </Button>
    </form>
  );
};
