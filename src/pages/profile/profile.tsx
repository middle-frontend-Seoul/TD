import React, { FC, useEffect, useState } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Avatar } from 'components-ui/avatar';
import { ProfileForm } from 'components/profile/profile-form';
import { URL } from 'core/url';
import { isValuesChange } from 'utils/formHelpers';
import { useMountEffect } from 'utils/hooks';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import {
  updateUser,
  updatePassword,
  updateAvatar,
  getTheme,
} from 'rdx/slices/user-slice';
import { IMAGE_SERVER_URL } from 'constants/network';

import defaultAvatar from './images/default-avatar.png';
import './profile.scss';

const PageProfile: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);
  const actionUpdateUser = useBoundAction(updateUser);
  const actionUpdatePassword = useBoundAction(updatePassword);
  const actionUpdateAvatar = useBoundAction(updateAvatar);
  const actionGetTheme = useBoundAction(getTheme);

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const profileUpdateError = useAppSelector((state) => state.user.error.user);
  const theme = useAppSelector((state) => state.user.theme);

  const passwordUpdateError = useAppSelector(
    (state) => state.user.error.password
  );
  const avatarUpdloadStatus = useAppSelector(
    (state) => state.user.mutatingAvatarStatus
  );

  const [isUpdate, setUpdate] = useState(false);

  useMountEffect(() => {
    actionGetCurrentUser();
  });

  useEffect(() => {
    if (currentUser?.id) {
      actionGetTheme(currentUser.id);
    }
  }, [currentUser, actionGetTheme]);

  const handleProfileSubmit = async (
    values: UserRequestInfo & UserPasswordRequestInfo
  ) => {
    const { oldPassword, newPassword, ...updateData } = values;

    if (isValuesChange<UserInfo>(updateData, currentUser)) {
      try {
        await actionUpdateUser(updateData);
      } catch (error) {
        console.error('could not update user', error); // eslint-disable-line
      }
    }

    if (oldPassword && newPassword) {
      try {
        await actionUpdatePassword({ oldPassword, newPassword });
      } catch (error) {
        console.error('could not update password', error); // eslint-disable-line
      }
    }

    await actionGetCurrentUser();

    if (!profileUpdateError && !passwordUpdateError) {
      setUpdate(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      await actionUpdateAvatar(files);
      actionGetCurrentUser();
    }
  };

  return (
    <Space type="vertical">
      <Space type="horizontal" position="center">
        <Avatar
          src={
            currentUser?.avatar
              ? `${IMAGE_SERVER_URL}${currentUser.avatar}`
              : defaultAvatar
          }
          size={130}
        >
          <label htmlFor="avatar_upload" className="avatar-upload">
            <input
              id="avatar_upload"
              name="avatar_upload"
              type="file"
              onChange={handleAvatarUpload}
              hidden
              disabled={avatarUpdloadStatus === 'pending'}
            />
          </label>
        </Avatar>
      </Space>
      <Space type="vertical">
        <Space type="horizontal" position="center">
          <Block type="inline">
            <Space type="vertical" position="center">
              <div className="profile">
                <ProfileForm
                  key={`${isUpdate}`}
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
                  {profileUpdateError.message}
                </div>
              )}
              {passwordUpdateError && (
                <div className="profile__submit-error">
                  {passwordUpdateError.message}
                </div>
              )}
            </Space>
          </Block>
        </Space>
        <Space type="horizontal" position="center">
          <Link type="button" to={URL.HOME.path}>
            На главный экран - {`${theme}`}
          </Link>
        </Space>
      </Space>
    </Space>
  );
};

export { PageProfile };
export default PageProfile;
