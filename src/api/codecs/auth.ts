export function decodeSignUp(dto: SignUpDto): SignUpInfo {
  return {
    id: dto.id,
  };
}

export function encodeSignUpRequest(info: SignUpRequestInfo): SignUpRequestDto {
  return {
    first_name: info.login,
    second_name: info.login,
    phone: '8888888888',
    email: info.email,
    login: info.login,
    password: info.password,
  };
}

export function decodeSigIn(dto: SignInDto): SignInInfo {
  return {
    id: dto.id,
  };
}

export function encodeSignInRequest(info: SignInRequestInfo): SignInRequestDto {
  return {
    login: info.login,
    password: info.password,
  };
}
