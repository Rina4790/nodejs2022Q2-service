import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntities } from './entities/user.entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntities])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
