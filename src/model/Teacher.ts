import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'teacher',
  timestamps: false,
})
export default class Teacher extends Model<Teacher> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  public intro: string;

  @Column({
    allowNull: false,
    field: 'unit',
    type: DataType.STRING,
  })
  public unit: string;

  @Column({
    allowNull: false,
    field: 'avatar_url',
    type: DataType.STRING,
  })
  public avatarUrl: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: 'user_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public userId: number;

  @BelongsTo(() => User)
  public user: User;
}
