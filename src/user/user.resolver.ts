import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserType } from '../graphql/types/user-type';
import { UsersService } from './user.service';
import { GraphqlService } from 'src/graphql/graphql.service';
import { LoginResponse } from '../graphql/types/login type';
import { CreateUserInput } from 'src/graphql/types/create-user-type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly graphqlService: GraphqlService) {}

  @Query(() => UserType)
  async getUserById(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Query(() => [UserType])
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.graphqlService.signUp(input);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('username') username: string, @Args('password') password: string) {
    const user = await this.graphqlService.login(username, password);

    if (!user) {
      throw new Error('Authentication failed.');
    }

    return user;
  }
}
