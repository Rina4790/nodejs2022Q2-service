import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-users.dto';
import { UserEntities } from './entities/user.entities';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userServise: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(): Promise<UserEntities[]> {
    return await this.userServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async create(@Body() createUserDto: CreateUserDto){
    return await this.userServise.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() userDto: UpdatePasswordDto) {
    return this.userServise.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.userServise.delete(id);
  }
}
