import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/status/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status])
  ],

  controllers: [StatusController],

  providers: [StatusService],

  exports: [StatusService],
})
export class StatusModule {}
