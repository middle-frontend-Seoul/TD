export function decodeUser(dto: UserDto): UserInfo {
  return {
    id: dto.id,
    firstName: dto.first_name,
    secondName: dto.second_name,
    displayName: dto.display_name,
    login: dto.login,
    avatar: dto.avatar,
    email: dto.email,
    phone: dto.phone,
  };
}

export function encodeUserRequest(info: UserRequestInfo): UserRequestDto {
  return {
    first_name: info.firstName,
    second_name: info.secondName,
    display_name: info.displayName,
    login: info.login,
    email: info.email,
    phone: info.phone,
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
