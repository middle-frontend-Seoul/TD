import React, { FC } from 'react';
import { useFormik } from 'formik';
import { validationMessages } from 'utils/validation';

import { Input } from 'components-ui/input';
import { Loading } from 'components-ui/loading';
import { Button } from 'components-ui/button';
import './style.scss';

export interface IMessageFormProps {
  loading?: boolean;
  onSubmit: (values: Omit<MessageRequestInfo, 'forumId' | 'themeId'>) => void;
}

export const MessageForm: FC<IMessageFormProps> = ({ onSubmit, loading }) => {
  const Form = useFormik({
    initialValues: { content: '' },
    validateOnChange: false,
    validateOnBlur: true,
    validate: (values: Record<string, string>) => {
      const errors: Record<string, string> = {};

      if (!values.content) {
        errors.content = validationMessages.isRequire;
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
          type="message"
          name="content"
          placeholder="Введите сообщение"
          onChange={Form.handleChange}
          error={Form.errors.content}
          value={Form.values.content}
        />
      </div>
      <Button type="submit" size="small">
        Добавить
      </Button>
    </form>
  );
};
