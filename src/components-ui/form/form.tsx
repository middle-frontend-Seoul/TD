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
  onSubmit: (values: any) => void;
  fields: Array<FormField>;
  validation: (value: Record<string, string>) => Record<string, string>;
  buttonText: string;
  title: string;
}

export const Form: FC<FormProps> = ({
  onSubmit,
  fields,
  validation,
  buttonText,
  title,
}) => {
  const initVals = React.useMemo(
    () =>
      fields.reduce(
        (res: Record<string, string>, { name, defaultValue = '' }) => {
          res[name] = defaultValue;
          return res;
        },
        {}
      ),
    [fields]
  );

  const form = useFormik({
    initialValues: initVals,
    validate: validation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="form">
      <Title size="small">{title}</Title>
      {fields.map((field) => (
        <div key={field.name}>
          <Input
            value={form.values[field.name]}
            onChange={form.handleChange}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
          />
          {form.errors[field.name] ? (
            <div className="field-error">{form.errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <Button type="submit" use="primary" className="form-button">
        {buttonText}
      </Button>
    </form>
  );
};
