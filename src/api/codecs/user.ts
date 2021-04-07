export function decodeUser(dto: UserDto): UserInfo {
  return {
    id: dto.id,
    login: dto.login,
    avatar: dto.avatar,
    email: dto.email,
  };
}

export function encodeUserRequest(info: UserRequestInfo): UserRequestDto {
  return {
    first_name: info.login,
    second_name: info.login,
    display_name: info.login,
    login: info.login,
    email: info.email,
    phone: '8888888888',
  };
}

export function encodeUserPasswordRequest(
  info: UserPasswordRequestInfo
): UserPasswordRequestDto {
  return {
    oldPassword: info.oldPassword,
    newPassword: info.newPassword,
  };
}

export function encodeUserAvatarRequest(
  info: UserAvatarRequestInfo
): UserAvatarRequestDto {
  const avatarFormData = new FormData();
  avatarFormData.append('avatar', info.avatarFiles[0]);
  return {
    avatar: avatarFormData,
  };
}
