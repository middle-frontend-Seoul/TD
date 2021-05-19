import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Message } from 'src/forum/model/message.model';

interface UserCreationAttrs {
  username: string;
  email: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Message)
  messages: Message[];
}
