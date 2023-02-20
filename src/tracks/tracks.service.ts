import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { db } from 'src/dataBase/db';
import { DeleteResult, In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { TrackEntities } from './entities/track.entities';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class TracksService {
	constructor(
		@InjectRepository(TrackEntities)
		private trackRepository: Repository<TrackEntities>,
	 ) {}

  getAll() {
    return this.trackRepository.find();
  }

  async getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findTrack = await this.trackRepository.findOne({ where: { id: id } });
    if (!findTrack) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findTrack;
  }

  async getByIds(ids: string[]) {
	return await this.trackRepository.find({ where: { id: In(ids) } });
 }
	
  async create(trackDto: CreateTrackDto) {

	  const newTrack = new TrackEntities
	  
	  Object.assign(newTrack, trackDto);

	  return await this.trackRepository.save(newTrack);
   
  }

  async update(id: string, trackDto: CreateTrackDto) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

      const findTrack = await this.getById(id)
	  if (findTrack) {
		  const { name, duration, artistId, albumId } = trackDto;
		  if (typeof name !== 'string' || typeof duration !== 'number')throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
		Object.assign(findTrack, trackDto);
      return await this.trackRepository.save(findTrack);
		}else throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
   
  }

  async delete(id: string): Promise<DeleteResult> {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findTrack = await this.getById(id)
    if (!findTrack) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
	  
	  return await this.trackRepository.delete(id)
  }
}
