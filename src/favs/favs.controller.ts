import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('/album/:id')
  addAlbom(@Param('id') id: string) {
    return this.favsService.addAlbom(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbom(@Param('id') id: string) {
    return this.favsService.deleteAlbom(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}
