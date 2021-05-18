export class CreateUserDto {
  readonly username: string;

  readonly email: string;

  readonly avatar?: string;

  readonly password: string;
}
