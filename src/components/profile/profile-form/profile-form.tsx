import React, { FC } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';

import { FieldProfile } from 'components-ui/field-profile';
import { Button } from 'components-ui/button';
import { setDefaultValues } from 'utils/formHelpers';

import { validation } from './profile-form-validation';

import './profile-form.scss';

const defaultUserValues = {
  id: 0,
  firstName: '',
  secondName: '',
  displayName: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
};

export interface IProfileFormProps {
  className?: string;
  initialValues?: UserInfo;
  isUpdate?: boolean;
  onSubmit: (values: UserRequestInfo & UserPasswordRequestInfo) => void;
  onCancel: () => void;
}

export const ProfileForm: FC<IProfileFormProps> = ({
  className,
  initialValues = defaultUserValues,
  isUpdate,
  onSubmit,
  onCancel,
}) => {
  const classes = cn(className, 'profile-form');

  const profileForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...setDefaultValues<UserInfo>(initialValues),
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    },
    validate: validation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      const {
        id: _id,
        avatar: _avatar,
        newPassword2: _newPassword2,
        ...variables
      } = values;
      onSubmit(variables);
    },
  });

  return (
    <form className={classes} onSubmit={profileForm.handleSubmit}>
      <div className="profile-form__items">
        <FieldProfile
          label="Никнейм"
          name="displayName"
          type="text"
          error={profileForm.errors.displayName}
          value={profileForm.values.displayName}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        <FieldProfile
          label="Логин"
          name="login"
          type="text"
          error={profileForm.errors.login}
          value={profileForm.values.login}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        <FieldProfile
          label="Email"
          name="email"
          type="text"
          error={profileForm.errors.email}
          value={profileForm.values.email}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        <FieldProfile
          label="Телефон"
          name="phone"
          type="text"
          error={profileForm.errors.phone}
          value={profileForm.values.phone}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        <FieldProfile
          label="Имя"
          name="firstName"
          type="text"
          error={profileForm.errors.firstName}
          value={profileForm.values.firstName}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        <FieldProfile
          label="Фамилия"
          name="secondName"
          type="text"
          error={profileForm.errors.secondName}
          value={profileForm.values.secondName}
          onChange={profileForm.handleChange}
          disabled={!isUpdate}
        />
        {isUpdate ? (
          <>
            <FieldProfile
              label="Старый пароль"
              name="oldPassword"
              type="password"
              error={profileForm.errors.oldPassword}
              value={profileForm.values.oldPassword}
              onChange={profileForm.handleChange}
              disabled={!isUpdate}
            />
            <FieldProfile
              label="Новый пароль"
              name="newPassword"
              type="password"
              error={profileForm.errors.newPassword}
              value={profileForm.values.newPassword}
              onChange={profileForm.handleChange}
              disabled={!isUpdate}
            />
            <FieldProfile
              label="Новый пароль (повторно)"
              name="newPassword2"
              type="password"
              error={profileForm.errors.newPassword2}
              value={profileForm.values.newPassword2}
              onChange={profileForm.handleChange}
              disabled={!isUpdate}
            />
          </>
        ) : null}
      </div>
      <div className="profile-form__buttons">
        {isUpdate ? (
          <>
            <Button type="submit" size="small" use="primary">
              Сохранить
            </Button>
            <Button
              className="profile-form__button_cancel"
              size="small"
              use="primary"
              onClick={() => {
                profileForm.resetForm();
                onCancel();
              }}
            >
              Отмена
            </Button>
          </>
        ) : null}
      </div>
    </form>
  );
};
