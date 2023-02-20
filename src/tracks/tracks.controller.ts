import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { TrackEntities } from './entities/track.entities';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Promise<TrackEntities[]> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  create(@Body() trackDto: CreateTrackDto) {
    return this.tracksService.create(trackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() trackDto: CreateTrackDto) {
    return this.tracksService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.tracksService.delete(id);
  }
}
