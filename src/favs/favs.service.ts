import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { FavoriteEntities } from './entities/favs.entities';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

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
  constructor(
    @Inject(TracksService)
    private tracksService: TracksService,
    @Inject(AlbumsService)
    private albumsService: AlbumsService,
    @Inject(ArtistsService)
    private artistsService: ArtistsService,
    @InjectRepository(FavoriteEntities)
    private favoriteRepository: Repository<FavoriteEntities>,
  ) {}

  async getAll() {
    const tracks = await this.favoriteRepository.find({
      where: {
        trackId: Not(IsNull()),
      },
    });
    const albums = await this.favoriteRepository.find({
      where: {
        albumId: Not(IsNull()),
      },
    });
    const artists = await this.favoriteRepository.find({
      where: {
        artistId: Not(IsNull()),
      },
    });
    const tracksByIds = tracks.map((item) => item.trackId);
    const albumsByIds = albums.map((item) => item.albumId);
    const artistsByIds = artists.map((item) => item.artistId);
    const tracksRes = await this.tracksService.getByIds(tracksByIds);
    const albumRes = await this.albumsService.getByIds(albumsByIds);
    const artistsRes = await this.artistsService.getByIds(artistsByIds);
    return {
      tracks: tracksRes,
      albums: albumRes,
      artists: artistsRes,
    };
  }

  async addTrack(id: string) {
    valide(id);
    const findTrack = await this.tracksService.findOne(id);
    if (!findTrack) notFound();
    const favTrack = this.favoriteRepository.create({
      trackId: id,
    });
    await this.favoriteRepository.save(favTrack);
    return findTrack;
  }

  async addAlbom(id: string) {
    valide(id);
    const findAlbum = await this.albumsService.findOne(id);
    if (!findAlbum) notFound();
    const favAlbom = this.favoriteRepository.create({
      albumId: id,
    });
    await this.favoriteRepository.save(favAlbom);
    return findAlbum;
  }

  async addArtist(id: string) {
    valide(id);
	  const findArtist = await this.artistsService.findOne(id);
    const findArtistInFavs = await this.favoriteRepository.findOne({
      where: { artistId: id },
	 });
	 if (!findArtist || findArtistInFavs) {
		notFound()
	}
    
      const favArtist = this.favoriteRepository.create({
        artistId: id,
      });
      await this.favoriteRepository.save(favArtist);
      return findArtist;
   
  }

  async deleteTrack(id: string) {
    valide(id);
    const findTrack = await this.favoriteRepository.findOne({
      where: { trackId: id },
    });
    if (!findTrack) notFound();
    await this.favoriteRepository.delete({ trackId: id });
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }

  async deleteAlbom(id: string) {
    valide(id);
    const findAlbom = await this.favoriteRepository.findOne({
      where: { albumId: id },
    });
    if (!findAlbom) notFound();
    await this.favoriteRepository.delete({ albumId: id });
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }

  async deleteArtist(id: string) {
    valide(id);
    const findArtist = await this.favoriteRepository.findOne({
      where: { artistId: id },
    });
    if (!findArtist) notFound();
    await this.favoriteRepository.delete({ artistId: id });
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
