import { Exclude } from 'class-transformer';

export class CreateUserDto {
  login: string;
  @Exclude()
  password: string;
}

export class UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
