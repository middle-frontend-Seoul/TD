import React, { FC, useState, useEffect } from 'react';

import { Link } from 'components-ui/link';
import { Block } from 'components-ui/block';
import { Space } from 'components-ui/space';
import { Button } from 'components-ui/button';
import { Avatar } from 'components-ui/avatar';
import { ProfileForm } from 'components/profile/profile-form';
import { HOME } from 'core/url';
import { isValuesChange } from 'utils/formHelpers';
import { useMountEffect } from 'utils/hooks';
import { useAppSelector, useBoundAction } from 'rdx/hooks';
import { getCurrentUser } from 'rdx/slices/auth-slice';
import { updateUser, updatePassword } from 'rdx/slices/user-slice';

import defaultAvatar from './images/default-avatar.png';
import './profile.scss';

const PageProfile: FC = () => {
  const actionGetCurrentUser = useBoundAction(getCurrentUser);
  const actionUpdateUser = useBoundAction(updateUser);
  const actionUpdatePassword = useBoundAction(updatePassword);

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const profileUpdateError = useAppSelector((state) => state.user.error.user);
  const profileUpdateStatus = useAppSelector(
    (state) => state.user.mutatingUserStatus
  );
  const passwordUpdateError = useAppSelector(
    (state) => state.user.error.password
  );
  const passwordUpdateStatus = useAppSelector(
    (state) => state.user.mutatingPasswordStatus
  );

  const [isUpdate, setUpdate] = useState(false);

  useMountEffect(() => {
    actionGetCurrentUser();
  });

  useEffect(() => {
    if (
      profileUpdateStatus !== 'pending' &&
      passwordUpdateStatus !== 'pending'
    ) {
      setUpdate(false);
      actionGetCurrentUser();
    }
  }, [actionGetCurrentUser, profileUpdateStatus, passwordUpdateStatus]);

  const handleProfileSubmit = async (
    values: UserRequestInfo & UserPasswordRequestInfo
  ) => {
    const { oldPassword, newPassword, ...updateData } = values;

    if (isValuesChange<UserInfo>(updateData, currentUser)) {
      actionUpdateUser(updateData);
    }

    if (oldPassword && newPassword) {
      actionUpdatePassword({ oldPassword, newPassword });
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
