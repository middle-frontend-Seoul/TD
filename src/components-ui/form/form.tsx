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
        (res: Record<string, string>, { name, defaultValue = '' }) => ({
          ...res,
          [name]: defaultValue,
        }),
        {}
      ),
    [fields]
  );

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: initVals,
    validate: validation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (formFields) => {
      onSubmit(formFields);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <Title size="small">{title}</Title>
      {fields.map((field) => (
        <div key={field.name}>
          <Input
            value={values[field.name]}
            onChange={handleChange}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
          />
          {errors[field.name] ? (
            <div className="field-error">{errors[field.name]}</div>
          ) : null}
        </div>
      ))}
      <Button type="submit" use="primary" className="form-button">
        {buttonText}
      </Button>
    </form>
  );
};
