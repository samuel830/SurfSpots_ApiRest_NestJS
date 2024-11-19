import { Module } from '@nestjs/common';
import { BeachsModule } from './beachs/beachs.module';
import { UsersModule } from './users/users.module';
import { Beach } from './beachs/models/beachs.models';
import { User } from './users/models/users.models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Beach, User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_,
      signOptions: {expiresIn: '30m'},
    }),
    BeachsModule,
    UsersModule,
  ]
})
export class AppModule {}
