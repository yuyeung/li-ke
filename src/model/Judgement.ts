import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'judgement',
  timestamps: false,
})
export default class Judgement extends Model<Judgement> {
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
  public userId: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
  })
  public publishedId: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  public content: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  public mark: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  public createAt: Date;
}
