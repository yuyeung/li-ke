import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Teacher from './Teacher';

@Table({
  tableName: 'prototype',
  timestamps: false,
})
export default class Prototype extends Model<Prototype> {
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
  public name: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  public content: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
  })
  public status: number;

  @ForeignKey(() => Teacher)
  @Column({
    allowNull: false,
    field: 'teacher_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public teacherId: number;

  @BelongsTo(() => Teacher)
  public teacher: Teacher;
}
