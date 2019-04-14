import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Organization from './Organization';
import Prototype from './Prototype';

@Table({
  tableName: 'request',
  timestamps: false,
})
export default class Request extends Model<Request> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
  })
  public status: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  public createAt: Date;

  @ForeignKey(() => Organization)
  @Column({
    allowNull: false,
    field: 'organization_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public organizationId: number;

  @BelongsTo(() => Organization)
  public organization: Organization;

  @ForeignKey(() => Prototype)
  @Column({
    allowNull: false,
    field: 'Prototype_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public prototypeId: number;

  @BelongsTo(() => Prototype)
  public prototype: Prototype;

}
