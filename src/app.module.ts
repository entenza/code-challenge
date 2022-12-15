import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as dotenv from 'dotenv';

import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

const config = dotenv.config().parsed;
// const mongoURI = `mongodb://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB_NAME}`;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.POSTGRES_HOST,
      port: parseInt(config.POSTGRES_PORT),
      username: config.POSTGRES_DB_USER,
      password: config.POSTGRES_DB_PASS,
      database: config.POSTGRES_DB_NAME,
      // entities: ['src/**/*.entity{.ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // MongooseModule.forRoot(
    //   mongoURI,
    // ),

    ScheduleModule.forRoot(),

    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
