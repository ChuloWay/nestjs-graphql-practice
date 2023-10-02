import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user-model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Unable to fetch user by ID: ${error.message}`);
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(`Unable to fetch users`);
    }
  }

  async createUser(data: Partial<User>): Promise<User> {
    try {
      const user = new this.userModel(data);
      return await user.save();
    } catch (error) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
  }
}
