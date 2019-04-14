import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'organization',
  timestamps: false,
})
export default class Organization extends Model<Organization> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  public id: number;

  @Column({
    allowNull: false,
    field: 'user_id',
    type: DataType.INTEGER,
    unique: true,
  })
  public userId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  public name: string;
}
