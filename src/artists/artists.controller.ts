import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntities } from './entities/artist.entities';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistServise: ArtistsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(): Promise<ArtistEntities[]> {
    return await this.artistServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() userDto: CreateArtistDto) {
    return this.artistServise.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistServise.delete(id);
  }
}
