import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class ArtistsService {
  artists = [];

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findArtist = this.artists.find((artist) => artist.id == id);
    if (!findArtist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findArtist;
  }

  create(artistDto: CreateArtistDto) {
    const { name, grammy } = artistDto;
    if (typeof name === 'string' && typeof grammy === 'boolean') {
      const newArtist = {
        id: uuidv4(),
        ...artistDto,
      };
      this.artists.push(newArtist);
      return newArtist;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, artistDto: CreateArtistDto) {
    const { name, grammy } = artistDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (typeof name === 'string' && typeof grammy === 'boolean') {
      const findArtist = this.artists.find((artist) => artist.id == id);
      if (!findArtist)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

      findArtist.name = name;
      findArtist.grammy = grammy;

      return findArtist;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findArtist = this.artists.find((artist) => artist.id == id);
    if (!findArtist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const i = this.artists.findIndex((artist) => artist.id == id);
    this.artists.splice(i, 1);
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
