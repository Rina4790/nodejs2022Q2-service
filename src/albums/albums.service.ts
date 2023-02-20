import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { validate as uuidValidate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntities } from './entities/album.entities';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntities)
    private albumRepository: Repository<AlbumEntities>,
  ) {}

  getAll() {
    return this.albumRepository.find();
  }

  async getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findAlbum = await this.albumRepository.findOne({ where: { id: id } });
    if (!findAlbum) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findAlbum;
  }

  async create(albumtDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntities();
    Object.assign(newAlbum, albumtDto);

    return await this.albumRepository.save(newAlbum);
  }

	async update(id: string, albumtDto: CreateAlbumDto): Promise<AlbumEntities>  {
		const { name, year, artistId } = albumtDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
	 if (typeof name !== 'string' || typeof year !== 'number') throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findAlbum = await this.getById(id);
    if (findAlbum) {
      Object.assign(findAlbum, albumtDto);
      return await this.albumRepository.save(findAlbum);
    }else throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
  }

  async delete(id: string): Promise<DeleteResult> {
    const valide = uuidValid(id);
	  if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
	  const findAlbum = await this.getById(id)
    if (!findAlbum) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return await this.albumRepository.delete(id)
  }
}
