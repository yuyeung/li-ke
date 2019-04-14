import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { Sequelize } from 'sequelize-typescript';
import config from './config';

const db = config.Database;
const sequelize = new Sequelize({
  database: db.name,
  dialect: db.dialect,
  host: db.host,
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  modelPaths: [path.resolve(__dirname, 'model')],
  operatorsAliases: false, // To disable deprecated warning.
  password: db.password,
  username: db.user,
});
export default sequelize;
