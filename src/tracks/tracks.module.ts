import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntities } from './entities/track.entities';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
	imports: [TypeOrmModule.forFeature([TrackEntities])],
  controllers: [TracksController],
	providers: [TracksService],
	exports: [TracksService],
})
export class TracksModule {}
