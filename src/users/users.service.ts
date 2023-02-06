import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { db } from 'src/dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-users.dto';

const uuidValid = (uuid: string): boolean => uuidValidate(uuid);

@Injectable()
export class UsersService {
  users = db.users;

  getAll() {
    const response = [];
    this.users.map((user) => {
      const data = plainToClass(CreateUserDto, user, {
        excludeExtraneousValues: false,
      });
      response.push(data);
    });
    return response;
  }

  getById(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findUser = this.users.find((user) => user.id == id);
    if (!findUser) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    return plainToClass(CreateUserDto, findUser, {
      excludeExtraneousValues: false,
    });
  }

  create(userDto: CreateUserDto) {
    const { login, password } = userDto;
    if (typeof login === 'string' && typeof password === 'string') {
      const newUser = {
        ...userDto,
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      this.users.push(newUser);
      return plainToClass(CreateUserDto, newUser, {
        excludeExtraneousValues: false,
      });
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, userDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = userDto;
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

    if (typeof oldPassword === 'string' && typeof newPassword === 'string') {
      const findUser = this.users.find((user) => user.id == id);
      if (!findUser) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      if (findUser.password !== oldPassword)
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      findUser.password = newPassword;
      findUser.version = findUser.version + 1;
      findUser.updatedAt = Date.now();

      return plainToClass(CreateUserDto, findUser, {
        excludeExtraneousValues: false,
      });
    } else {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string) {
    const valide = uuidValid(id);
    if (!valide) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    const findUser = this.users.find((user) => user.id == id);
    if (!findUser) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    const i = this.users.findIndex((user) => user.id == id);
    this.users.splice(i, 1);
    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
