import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user-type';

@ObjectType()
export class LoginResponse {
  @Field(() => UserType)
  user: UserType;

  @Field()
  token: string;
}
