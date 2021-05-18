import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Theme } from './theme.model';

interface ForumCreationAttrs {
  name: string;
}

@Table({tableName: 'forums'})
export class Forum extends Model<Forum, ForumCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Theme)
  themes: Theme[];
}
