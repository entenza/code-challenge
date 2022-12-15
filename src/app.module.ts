import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusController } from './status/status.controller';
import { Status } from './status/status.entity';
import { StatusModule } from './status/status.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'personal_test',
      // entities: ['src/**/*.entity{.ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    StatusModule,
  ],
  controllers: [AppController, StatusController],
  providers: [AppService],
})
export class AppModule {}
