import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import 'dotenv/config';

import { UserEntities } from 'src/users/entities/user.entities';
import { ArtistEntities } from 'src/artists/entities/artist.entities';
import { AlbumEntities } from 'src/albums/entities/album.entities';
import { TrackEntities } from 'src/tracks/entities/track.entities';
import { FavoriteEntities } from 'src/favs/entities/favs.entities';

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
  entities: [
    UserEntities,
    ArtistEntities,
    AlbumEntities,
    TrackEntities,
    FavoriteEntities,
  ],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(ormConfigMigrations);
