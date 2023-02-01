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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumServise: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  create(@Body() albumtDto: CreateAlbumDto) {
    return this.albumServise.create(albumtDto);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() albumtDto: CreateAlbumDto) {
    return this.albumServise.update(id, albumtDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.albumServise.delete(id);
  }
}
