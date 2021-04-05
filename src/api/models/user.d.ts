type UserDto = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string;
  phone: string;
}
type UserInfo = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  avatar: string | null;
  email: string;
  phone: string;
};

type UserRequestDto = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone?: string;
}
type UserRequestInfo = {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone?: string;
}

type UserPasswordRequestDto = {
  oldPassword: string;
  newPassword: string;
}
type UserPasswordRequestInfo = {
  oldPassword: string;
  newPassword: string;
}

type UserAvatarRequestDto = {
  avatar: FormData;
};
type UserAvatarRequestInfo = {
  avatarFiles: FileList;
};
