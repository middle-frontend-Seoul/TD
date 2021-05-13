import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
  ya_id: number;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: 1, description: 'Уникальный id сервиса TD'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 1, description: 'Уникальный id сервиса Yandex'})
  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  ya_id: number;
}
