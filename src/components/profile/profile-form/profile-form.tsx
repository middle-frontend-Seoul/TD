import React, { FC } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';

import { FieldProfile } from 'components-ui/field-profile';
import { Button } from 'components-ui/button';
import { useAppSelector } from 'rdx/hooks';
import { setDefaultValues } from 'utils/formHelpers';

import { validation } from './profile-form-validation';

import './profile-form.scss';

const defaultUserValues = {
  id: 0,
  login: '',
  email: '',
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

  const currentUserLoadingStatus = useAppSelector(
    (state) => state.auth.loadingStatus
  );
  const profileUpdateStatus = useAppSelector(
    (state) => state.user.mutatingUserStatus
  );
  const passwordUpdateStatus = useAppSelector(
    (state) => state.user.mutatingPasswordStatus
  );

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
          label="Логин"
          name="login"
          type="text"
          focus={isUpdate}
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
            <Button
              type="submit"
              size="small"
              use="primary"
              disabled={
                currentUserLoadingStatus === 'pending' ||
                profileUpdateStatus === 'pending' ||
                passwordUpdateStatus === 'pending'
              }
            >
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
