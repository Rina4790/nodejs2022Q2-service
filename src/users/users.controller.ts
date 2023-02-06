import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userServise: UsersService) {}

  @Get()
  getAll() {
    return this.userServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userServise.create(createUserDto);
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
