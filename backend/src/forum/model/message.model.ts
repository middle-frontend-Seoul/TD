import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Theme } from './theme.model';

interface MessageCreationAttrs {
  name: string;
  view_count: number;
}

@Table({tableName: 'messages'})
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ForeignKey(() => Theme)
  @Column({type: DataType.INTEGER, field: 'theme_id' })
  themeId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @BelongsTo(() => Theme)
  theme: Theme;

  @BelongsTo(() => User)
  user: User;
}
