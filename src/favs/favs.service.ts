import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { db } from 'src/dataBase/db';

const valide = (id: string) => {
  const uuidValid = (uuid: string): boolean => uuidValidate(uuid);
  const valide = uuidValid(id);
  if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
};

const notFound = () => {
  throw new HttpException('NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY);
};

@Injectable()
export class FavsService {
  favs = db.favs;

  getAll() {
    return this.favs;
  }

  addTrack(id: string) {
    valide(id);
    const favTrack = db.tracks.find((track) => track.id == id);
    if (!favTrack) notFound();
    this.favs.tracks.push(favTrack);
    return favTrack;
  }

  addAlbom(id: string) {
    valide(id);
    const favAlbom = db.albums.find((album) => album.id == id);
    if (!favAlbom) notFound();
    this.favs.albums.push(favAlbom);
    return favAlbom;
  }

  addArtist(id: string) {
    valide(id);
    const favArtist = db.artists.find((artist) => artist.id == id);
    if (!favArtist) notFound();
    this.favs.artists.push(favArtist);
    return favArtist;
  }

  deleteTrack(id: string) {
    valide(id);
    const favTrack = db.favs.tracks.find((track) => track.id == id);
    if (!favTrack) notFound();
    const fI = db.favs.tracks.findIndex((track) => track.id == id);
    db.favs.tracks.splice(fI, 1);
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }

  deleteAlbom(id: string) {
    valide(id);
    const favAlbom = db.favs.albums.find((album) => album.id == id);
    if (!favAlbom) notFound();
    const fI = db.favs.albums.findIndex((album) => album.id == id);
    db.favs.albums.splice(fI, 1);
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }

  deleteArtist(id: string) {
    valide(id);
    const favArtist = db.favs.artists.find((artist) => artist.id == id);
    if (!favArtist) notFound();
    const fI = db.favs.artists.findIndex((artist) => artist.id == id);
    db.favs.artists.splice(fI, 1);
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
