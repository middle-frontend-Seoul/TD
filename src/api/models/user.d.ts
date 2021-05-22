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
  login: string;
  avatar: string | null;
  email: string;
};

type ForumUserDto = {
  id: number;
  username: string;
  avatar: string | null;
  email: string;
}
type ForumUserInfo = {
  id: number;
  username: string;
  avatar: string | null;
  email: string;
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
  login: string;
  email: string;
}

type UserPasswordRequestDto = {
  oldPassword: string;
  newPassword: string;
}
type UserPasswordRequestInfo = {
  oldPassword: string;
  newPassword: string;
}

type UserAvatarRequestDto = FormData;
type UserAvatarRequestInfo = FileList;
