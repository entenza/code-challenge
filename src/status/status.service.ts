import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Status } from 'src/status/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async getStatus() {
    try {
      await this.statusRepository.findOne({
        where: {  
            value : 's'
        } 
      })

      return {
        success: true
      }
    } catch (error) {
      console.log(error);
      return {
        error : false
      }
    }
  }
}
