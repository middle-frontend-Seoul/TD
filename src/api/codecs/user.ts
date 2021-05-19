export function fromUserDto(dto: UserDto): UserInfo {
  return {
    id: dto.id,
    login: dto.login,
    avatar: dto.avatar,
    email: dto.email,
  };
}

export function fromForumUserDto(dto: ForumUserDto): ForumUserInfo {
  return {
    id: dto.id,
    username: dto.username,
    avatar: dto.avatar,
    email: dto.email,
  };
}

export function toUserRequestDto(info: UserRequestInfo): UserRequestDto {
  return {
    first_name: info.login,
    second_name: info.login,
    display_name: info.login,
    login: info.login,
    email: info.email,
    phone: '8888888888',
  };
}

export function toUserPasswordRequestDto(
  info: UserPasswordRequestInfo
): UserPasswordRequestDto {
  return {
    oldPassword: info.oldPassword,
    newPassword: info.newPassword,
  };
}

export function toUserAvatarRequestDto(
  info: UserAvatarRequestInfo
): UserAvatarRequestDto {
  const avatarFormData = new FormData();
  avatarFormData.append('avatar', info[0]);
  return avatarFormData;
}
