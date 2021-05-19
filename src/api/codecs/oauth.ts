export function fromOAuthDto(dto: OAuthDto): OAuthInfo {
  return {
    service_id: dto.service_id,
  };
}

export function fromOAuthSigInDto(dto: OAuthSignInDto): OAuthSignInInfo {
  return {
    data: dto.data,
  };
}

export function toOAuthSignInRequestDto(
  info: OAuthSignInRequestInfo
): OAuthSignInRequestDto {
  return {
    code: info.code,
    redirect_uri: info.redirect_uri,
  };
}
