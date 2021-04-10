import React, { FC, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Avatar } from 'components-ui/avatar';
import { ProfileForm } from 'components/profile/profile-form';
import { HOME } from 'core/url';
import { isValuesChange } from 'utils/formHelpers';
import { useMountEffect } from 'utils/hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getCurrentUser } from 'redux/slices/authSlice';
import { updateUser, updatePassword } from 'redux/slices/userSlice';

import defaultAvatar from './images/default-avatar.png';
import './profile.scss';

const PageProfile: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [profileUpdateError, setProfileUpdateError] = React.useState('');
  const [passwordUpdateError, setPasswordUpdateError] = React.useState('');
  const [isUpdate, setUpdate] = useState(false);

  useMountEffect(() => {
    dispatch(getCurrentUser());
  });

  const handleProfileSubmit = async (
    values: UserRequestInfo & UserPasswordRequestInfo
  ) => {
    const { oldPassword, newPassword, ...updateData } = values;
    let updateError = false;

    if (isValuesChange<UserInfo>(updateData, currentUser)) {
      try {
        const resultAction = await dispatch(updateUser(updateData));
        unwrapResult(resultAction);
      } catch (error) {
        updateError = true;
        setProfileUpdateError(error.response?.data.reason);
      }
    }

    if (oldPassword && newPassword) {
      try {
        const resultAction = await dispatch(
          updatePassword({
            oldPassword,
            newPassword,
          })
        );
        unwrapResult(resultAction);
      } catch (error) {
        updateError = true;
        setPasswordUpdateError(error.response?.data.reason);
      }
    }

    if (!updateError) {
      setUpdate(false);
      dispatch(getCurrentUser());
    }
  };

  return (
    <Space type="vertical">
      <Space type="horizontal" position="center">
        <Avatar src={currentUser?.avatar || defaultAvatar} size={130} />
      </Space>
      <Space type="vertical">
        <Space type="horizontal" position="center">
          <Block type="inline">
            <Space type="vertical" position="center">
              <div className="profile">
                <ProfileForm
                  className="profile__profile-form"
                  initialValues={currentUser}
                  onSubmit={handleProfileSubmit}
                  isUpdate={isUpdate}
                  onCancel={() => setUpdate(false)}
                />
                {!isUpdate && (
                  <div className="profile-form__buttons">
                    <Button
                      size="small"
                      use="primary"
                      onClick={() => setUpdate(true)}
                    >
                      Редактировать
                    </Button>
                  </div>
                )}
              </div>
              {profileUpdateError && (
                <div className="profile__submit-error">
                  {profileUpdateError}
                </div>
              )}
              {passwordUpdateError && (
                <div className="profile__submit-error">
                  {passwordUpdateError}
                </div>
              )}
            </Space>
          </Block>
        </Space>
        <Space type="horizontal" position="center">
          <Link type="button" to={HOME}>
            На главный экран
          </Link>
        </Space>
      </Space>
    </Space>
  );
};

export { PageProfile };
export default PageProfile;
