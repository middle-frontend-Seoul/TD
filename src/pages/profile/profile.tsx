import React, { FC, useState } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Avatar } from 'components-ui/avatar';
import { ProfileForm } from 'components/profile/profile-form';
import { HOME } from 'core/url';
import { isValuesChange } from 'utils/formHelpers';
import { useMountEffect } from 'utils/hooks';
import { useAppSelector, useBoundAction } from 'redux/hooks';
import { getCurrentUser } from 'redux/slices/authSlice';
import { updateUser, updatePassword } from 'redux/slices/userSlice';

import defaultAvatar from './images/default-avatar.png';
import './profile.scss';

const PageProfile: FC = () => {
  const boundGetCurrentUser = useBoundAction(getCurrentUser);
  const boundUpdateUser = useBoundAction(updateUser);
  const boundUpdatePassword = useBoundAction(updatePassword);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const profileUpdateError = useAppSelector((state) => state.user.error.user);
  const passwordUpdateError = useAppSelector(
    (state) => state.user.error.password
  );
  const [isUpdate, setUpdate] = useState(false);

  useMountEffect(() => {
    boundGetCurrentUser();
  });

  const handleProfileSubmit = async (
    values: UserRequestInfo & UserPasswordRequestInfo
  ) => {
    const { oldPassword, newPassword, ...updateData } = values;
    const onSuccess = () => {
      setUpdate(false);
      boundGetCurrentUser();
    };

    if (isValuesChange<UserInfo>(updateData, currentUser)) {
      boundUpdateUser({ payload: updateData, callback: { onSuccess } });
    }

    if (oldPassword && newPassword) {
      boundUpdatePassword({
        payload: { oldPassword, newPassword },
        callback: { onSuccess },
      });
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
                  {(profileUpdateError as HttpError)?.response?.data.reason}
                </div>
              )}
              {passwordUpdateError && (
                <div className="profile__submit-error">
                  {(passwordUpdateError as HttpError)?.response?.data.reason}
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
