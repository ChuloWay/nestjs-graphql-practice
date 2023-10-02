import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphqlModule } from './graphql/graphql.module';
import { UsersResolver } from './user/user.resolver';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { connectToDatabase } from './utils/db';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => await connectToDatabase(),
    }),
    UsersModule,
    GraphqlModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UsersResolver, AuthService],
})
export class AppModule {}
