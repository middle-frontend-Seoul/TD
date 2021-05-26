import React, { FC } from 'react';
import { useFormik } from 'formik';
import { validationMessages } from 'utils/validation';

import { Input } from 'components-ui/input';
import { Loading } from 'components-ui/loading';
import { Button } from 'components-ui/button';
import './style.scss';

export interface IForumFormProps {
  loading?: boolean;
  onSubmit: (values: ForumRequestInfo) => void;
}

export const ForumForm: FC<IForumFormProps> = ({ onSubmit, loading }) => {
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
    <form onSubmit={Form.handleSubmit} className="forum-form">
      {Boolean(loading) && (
        <div className="forum-form_load">
          <Loading className="forum-form_loading" />
        </div>
      )}
      <div className="forum-form_body">
        <Input
          type="text"
          name="name"
          placeholder="Введите название форума"
          onChange={Form.handleChange}
          error={Form.errors.name}
          value={Form.values.name}
        />
      </div>
      <Button type="submit" size="small">
        Добавить
      </Button>
    </form>
  );
};
