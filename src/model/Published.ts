import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Organization from './Organization';
import Prototype from './Prototype';
import Teacher from './Teacher';

@Table({
  tableName: 'published',
  timestamps: false,
})
export default class Published extends Model<Published> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @ForeignKey(() => Teacher)
  @Column({
    allowNull: false,
    field: 'teacher_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public teacherId: number;

  @ForeignKey(() => Prototype)
  @Column({
    allowNull: false,
    field: 'prototype_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public prototypeId: number;

  @ForeignKey(() => Organization)
  @Column({
    allowNull: false,
    field: 'organization_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public organizationId: number;

  @BelongsTo(() => Teacher)
  public teacher: Teacher;

  @BelongsTo(() => Prototype)
  public prototype: Prototype;

  @BelongsTo(() => Organization)
  public organization: Organization;

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
}
