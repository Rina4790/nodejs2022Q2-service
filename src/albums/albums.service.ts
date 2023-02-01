import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class AlbumsService {
  albums = db.albums;
  artists = db.artists;

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findAlbum = this.albums.find((album) => album.id == id);
    if (!findAlbum) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findAlbum;
  }

  create(albumtDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...albumtDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, albumtDto: CreateAlbumDto) {
    const { name, year, artistId } = albumtDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (typeof name === 'string' && typeof year === 'number') {
      const findAlbum = this.albums.find((album) => album.id == id);
      if (!findAlbum)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

      findAlbum.name = name;
      findAlbum.year = year;
      if (artistId) findAlbum.artistId = artistId;

      return findAlbum;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findAlbum = this.albums.find((album) => album.id == id);
    if (!findAlbum) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const i = this.albums.findIndex((album) => album.id == id);
    this.albums.splice(i, 1);

    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
