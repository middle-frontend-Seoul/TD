import React, { FC } from 'react';
import { useFormik } from 'formik';
import { validationMessages } from 'utils/validation';

import { Input } from 'components-ui/input';
import { Loading } from 'components-ui/loading';
import { Button } from 'components-ui/button';
import './style.scss';

export interface IThemeFormProps {
  loading?: boolean;
  onSubmit: (values: Omit<ThemeRequestInfo, 'forumId'>) => void;
}

export const ThemeForm: FC<IThemeFormProps> = ({ onSubmit, loading }) => {
  const Form = useFormik({
    initialValues: { name: '' },
    validateOnChange: false,
    validateOnBlur: true,
    validate: (values: Record<string, string>) => {
      const errors: Record<string, string> = {};

      if (!values.name) {
        errors.name = validationMessages.isRequire;
      }

      return errors;
    },
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form onSubmit={Form.handleSubmit} className="theme-form">
      {Boolean(loading) && (
        <div className="theme-form_load">
          <Loading className="theme-form_loading" />
        </div>
      )}
      <div className="theme-form_body">
        <Input
          type="text"
          name="name"
          placeholder="Введите название темы"
          onChange={Form.handleChange}
          error={Form.errors.name}
          value={Form.values.name}
          autoFocus
        />
      </div>
      <Button type="submit" size="small">
        Добавить
      </Button>
    </form>
  );
};
