import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonNewsDto } from 'src/common/dtos/common-news.dto';
import { Repository } from 'typeorm';

import { News } from './news.entity';
@Injectable()
export class NewsPgRepository {
  constructor(
    @InjectRepository(News)
    private readonly repo: Repository<News>,
  ) {}

  async storeNew(news: CommonNewsDto) {
    const existingNew = await this.repo.findOne({
      where: {
        objectID: news.objectID,
      },
    });

    // create if not exist
    if (!existingNew) {
      this.repo.save(news);
    }
  }

  async findAll() {

    return await this.repo.find()
  }
}
