
import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import 'dotenv/config';

import { UserEntities } from 'src/users/entities/user.entities';


export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
export const host = process.env.POSTGRES_HOST_MIGRATIONS;
export const ormConfigMigrations: DataSourceOptions = {
  type: 'postgres',
  host,
  username,
  password,
  database,
  entities: [UserEntities],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(ormConfigMigrations);