import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntities } from './entities/artist.entities';

@Module({
	imports: [TypeOrmModule.forFeature([ArtistEntities])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
