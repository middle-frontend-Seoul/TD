import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Message } from './message.model';

interface MessageLikeCreationAttrs {
  userId: number;
  messageId: number;
}

@Table({tableName: 'message_likes'})
export class MessageLike extends Model<MessageLike, MessageLikeCreationAttrs> {
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'user_id' })
  userId: number;

  @ForeignKey(() => Message)
  @Column({type: DataType.INTEGER, field: 'message_id' })
  messageId: number;
}
