import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

interface DatabaseConfig {
  host: string;
  name: string;
  user: string;
  password: string;
  dialect: string;
}

interface WebConfig {
  port: number;
  account: string;
  password: string;
}

interface JWTConfig {
  lifetime: string;
  secret: string;
}

interface Config {
  Database: DatabaseConfig;
  WEB: WebConfig;
  JWT: JWTConfig;
}

const env = process.env.NODE_ENV === 'production' ? 'production' : 'default';
const configPath = path.resolve(__dirname, '..', 'config', `${env}.json`);
const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' })) as Config;

export default config;
