import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { UserEntities } from 'src/users/entities/user.entities';
import { ArtistEntities } from 'src/artists/entities/artist.entities';

dotenv.config();


export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
export const host = process.env.POSTGRES_HOST;
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host,
  username,
  password,
  database,
  entities: [UserEntities, ArtistEntities],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: true,
};

// export const ormConfig: DataSourceOptions = {
// 	type: 'postgres',
// 	host: process.env.POSTGRES_HOST as string,
// 	port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
// 	username: process.env.POSTGRES_USER as string,
// 	password: process.env.POSTGRES_PASSWORD as string,
// 	database: process.env.POSTGRES_DB as string,
// 	synchronize: false,
// 	entities: [],
// 	//   migrations: [__dirname, 'dist/**/migrations/*.js'],
// } 

export const dataSource = new DataSource(ormConfig);
