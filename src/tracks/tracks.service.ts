import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-tracks.dto';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class TracksService {
  tracks = db.tracks;

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findTrack = this.tracks.find((track) => track.id == id);
    if (!findTrack) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findTrack;
  }

  create(trackDto: CreateTrackDto) {
    const { name, duration } = trackDto;
    if (typeof name === 'string' && typeof duration === 'number') {
      const newTrack = {
        id: uuidv4(),
        ...trackDto,
      };
      this.tracks.push(newTrack);
      return newTrack;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, trackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = trackDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (typeof name === 'string' && typeof duration === 'number') {
      const findTrack = this.tracks.find((track) => track.id == id);
      if (!findTrack)
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

      findTrack.name = name;
      findTrack.duration = duration;
      if (artistId) findTrack.artistId = artistId;
      if (albumId) findTrack.albumId = albumId;
      return findTrack;
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findTrack = this.tracks.find((track) => track.id == id);
    if (!findTrack) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const i = this.tracks.findIndex((track) => track.id == id);
    this.tracks.splice(i, 1);

    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
