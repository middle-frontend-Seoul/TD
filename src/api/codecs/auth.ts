export function fromSignUpDto(dto: SignUpDto): SignUpInfo {
  return {
    id: dto.id,
  };
}

export function toSignUpRequestDto(info: SignUpRequestInfo): SignUpRequestDto {
  return {
    first_name: info.login,
    second_name: info.login,
    phone: '8888888888',
    email: info.email,
    login: info.login,
    password: info.password,
  };
}

export function toForumSignUpRequestDto(
  info: ForumSignUpRequestInfo
): ForumSignUpRequestDto {
  return {
    username: info.username,
    email: info.email,
    password: info.password,
    password_confirm: info.repeatedPassword,
  };
}

export function fromSigInDto(dto: SignInDto): SignInInfo {
  return {
    id: dto.id,
  };
}

export function toSignInRequestDto(info: SignInRequestInfo): SignInRequestDto {
  return {
    login: info.login,
    password: info.password,
  };
}

export function toForumSignInRequestDto(
  info: ForumSignInRequestInfo
): ForumSignInRequestDto {
  return {
    username: info.username,
    password: info.password,
  };
}
