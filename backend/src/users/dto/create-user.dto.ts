import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 1, description: 'Уникальный id сервиса Yandex'})
  readonly ya_id: number;
}
