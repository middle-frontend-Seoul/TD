import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Forum } from './forum.model';
import { Theme } from './theme.model';
import { MessageLike } from './message-like';

interface MessageCreationAttrs {
  content: string;
  themeId: number;
  forumId: number;
  userId: number;
}

@Table({tableName: 'messages'})
export class Message extends Model<Message, MessageCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  // TODO - это избыточно, кол-во сообщений в форуме можно получать через themes, но пока сделано для упрощения
  @ForeignKey(() => Forum)
  @Column({type: DataType.INTEGER, field: 'forum_id' })
  forumId: number;

  @ForeignKey(() => Theme)
  @Column({type: DataType.INTEGER, field: 'theme_id' })
  themeId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @BelongsTo(() => Forum)
  forum: Forum;

  @BelongsTo(() => Theme)
  theme: Theme;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(()=> User, () => MessageLike)
  likedByUsers: User[];
}
