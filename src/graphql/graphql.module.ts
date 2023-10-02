import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from 'src/user/user.module';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphqlService } from './graphql.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      playground: true,
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [GraphqlService, AuthService],
  exports: [GraphqlService],
})
export class GraphqlModule {}
