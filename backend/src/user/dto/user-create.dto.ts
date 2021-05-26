export class UserCreateDto {
  readonly id: number;

  readonly login: string;

  readonly email: string;

  readonly avatar?: string;
}
