type OAuthDto = {
  service_id?: string;
}
type OAuthInfo = {
  service_id?: string;
}

type OAuthSignInDto = {
  data?: string;
};

type OAuthSignInInfo = {
  data?: string;
}

type OAuthSignInRequestInfo = {
  code: string;
  redirect_uri: string;
}

type OAuthSignInRequestDto = {
  code: string,
  redirect_uri: string,
}
