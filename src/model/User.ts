import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: false,
})
export default class User extends Model<User> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  public nickname: string;

  @Column({
    allowNull: false,
    field: 'avatar_url',
    type: DataType.STRING,
    unique: true,
  })
  public avatarUrl: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
  })
  public type: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  public name: string;

  @Column({
    allowNull: false,
    field: 'open_id',
    type: DataType.STRING,
  })
  public openId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  public account: string;
}
