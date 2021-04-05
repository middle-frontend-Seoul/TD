type SignUpDto = {
  id?: number;
};

type SignUpInfo = {
  id?: number
}

type SignUpRequestInfo = {
  login: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

type SignUpRequestDto = {
  first_name: string,
  second_name: string,
  phone: string,
  email: string,
  login: string,
  password: string,
}

type SignInDto = {
  id?: number;
};

type SignInInfo = {
  id?: number
}

type SignInRequestInfo = {
  login: string;
  password: string;
}

type SignInRequestDto = {
  login: string,
  password: string,
}