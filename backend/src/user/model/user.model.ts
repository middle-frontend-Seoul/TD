import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Message } from 'src/forum/model/message.model';

interface UserCreationAttrs {
  id: number;
  login: string;
  email: string;
  avatar?: string;
  theme?: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'default' })
  theme: string;

  @HasMany(() => Message)
  messages: Message[];
}
