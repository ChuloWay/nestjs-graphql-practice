import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/model/user-model';
import { UsersService } from 'src/user/user.service';
import { CreateUserInput } from './types/create-user-type';
import { hashSync } from 'bcryptjs';
import { JwtPayloadService } from 'src/auth/Strategy/jwtPayloadService';

@Injectable()
export class GraphqlService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtPayloadService: JwtPayloadService,
  ) {}

  async signUp(signUpData: CreateUserInput): Promise<User> {
    const existingUser = await this.userService.findByUsername(signUpData.username);
    const isEmailTaken = await this.userService.findByEmail(signUpData.email);
    if (existingUser || isEmailTaken) {
      throw new Error('User already exists');
    }

    const newUser = await this.userService.createUser(signUpData);

    return newUser;
  }

  async login(username: string, password: string): Promise<Record<string, any>> {
    const user = await this.userService.findByUsername(username);
    console.log(user);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.authService.comparePassword(password, user.password);

    console.log('here:', isPasswordValid);

    if (!isPasswordValid) {
      return null;
    }

    const { id, email } = user;

    const data = {
      id,
      email,
    };

    const token = this.jwtPayloadService.createToken(data);

    console.log(token);

    return {
      user,
      token,
    };
  }
}
