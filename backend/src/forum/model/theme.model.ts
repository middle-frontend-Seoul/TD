import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Forum } from './forum.model';
import { Message } from './message.model';

interface ThemeCreationAttrs {
  name: string;
  viewCount?: number;
  forumId: number;
}

@Table({tableName: 'themes'})
export class Theme extends Model<Theme, ThemeCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0, field: 'view_count' })
  viewCount: number;

  @ForeignKey(() => Forum)
  @Column({type: DataType.INTEGER, field: 'forum_id' })
  forumId: number;

  @BelongsTo(() => Forum)
  forum: Forum;

  @HasMany(() => Message)
  messages: Message[];
}
