import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface YaSessionCreationAttrs {
  ya_cookie: string;
  ya_id: string;
  login: string;
  email: string;
  avatar: string;
}

@Table({tableName: 'sessions'})
export class YaSession extends Model<YaSession, YaSessionCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  ya_cookie: string;

  @Column({ type: DataType.INTEGER })
  ya_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;
}
