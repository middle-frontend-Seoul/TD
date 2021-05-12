import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserCreationAttrs {
  ya_id: number;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.INTEGER, unique: true, allowNull: false})
  ya_id: number;
}
