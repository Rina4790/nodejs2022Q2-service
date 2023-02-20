import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { UserEntities } from 'src/users/entities/user.entities';
import { ArtistEntities } from 'src/artists/entities/artist.entities';
import { AlbumEntities } from 'src/albums/entities/album.entities';

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
  entities: [UserEntities, ArtistEntities, AlbumEntities],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(ormConfig);
