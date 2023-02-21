import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { FavoriteEntities } from './entities/favs.entities';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
	imports: [TypeOrmModule.forFeature([FavoriteEntities]),
	TracksModule,
	AlbumsModule,
	ArtistsModule,
	],
  controllers: [FavsController],
	providers: [FavsService],

})
export class FavsModule {}



