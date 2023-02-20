import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { db } from 'src/dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-users.dto';
import { UserEntities } from './entities/user.entities';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntities)
		private readonly usersRepository: Repository<UserEntities>,
	){}
	
  users = db.users;

  public async getAll() {
	  const userss = await this.usersRepository.find()
	  return userss
	//   return userss.map((user)=> user.toResponse())
  }

  async getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findUser = await this.usersRepository.findOne({ where: { id: id } });
    if (!findUser) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return findUser.toResponse()
  }

  async create(userDto: CreateUserDto) {
    const { login, password } = userDto;
    if (typeof login === 'string' && typeof password === 'string') {
		 const userEntity = new UserEntities();
		 Object.assign(userEntity, userDto);
		 return (await this.usersRepository.save(userEntity)).toResponse();
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, userDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = userDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (typeof oldPassword === 'string' && typeof newPassword === 'string') {
      const findUser = await this.usersRepository.findOne({ where: { id: id } });
      if (!findUser) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      if (findUser.password !== oldPassword)
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      findUser.password = newPassword;
      findUser.version = findUser.version + 1;
      findUser.updatedAt = Math.floor(Date.now() / 1000);

      return (await this.usersRepository.save(findUser)).toResponse();
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
	  const result = await this.usersRepository.delete(id);
	  if (result.affected === 0) {
      return new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    } else {
      return new HttpException('Deleted', HttpStatus.NO_CONTENT);
    }
    
  }
}
