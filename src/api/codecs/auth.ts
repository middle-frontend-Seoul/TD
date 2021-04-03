export function decodeSignUp(dto: SignUpDto): SignUpInfo {
  return {
    id: dto.id,
  };
}

export function encodeLeaderboardRequest(
  info: SignUpRequestInfo
): SignUpRequestDto {
  return {
    first_name: info.login,
    second_name: info.login,
    phone: '8888888888',
    email: info.email,
    login: info.login,
    password: info.password,
  };
}
