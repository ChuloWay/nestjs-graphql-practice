import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/model/user-model';
import { UsersService } from 'src/user/user.service';
import { compareSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async comparePassword(newPassword: string, passwordHash: string): Promise<boolean> {
    return compareSync(newPassword, passwordHash);
  }
}
