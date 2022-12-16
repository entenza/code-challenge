import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonNewsDto } from 'src/common/dtos/common-news.dto';
import { ERROR_NEW_NOT_EXIST } from 'src/common/errors';
import { GetNewsRequest } from 'src/common/request/getNews.request';
import { Repository } from 'typeorm';
import { numberOfMonth } from '../common/validMonths';

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

  async findAll(query: GetNewsRequest) {
    const { author, tag, title, month } = query;
    let qb = this.repo.createQueryBuilder().where('deleted is null');

    if (author) qb = qb.andWhere('author = :author', { author });

    if (tag) qb = qb.andWhere('tags like :tag', { tag: `%${tag}%` });

    if (title) qb = qb.andWhere('title = :title', { title });

    if (month) {
      qb = qb.andWhere("DATE_PART('month', created_at ) = :month", {
        month: numberOfMonth[month],
      });
    }

    return await qb.getMany();
  }

  async remove(objectID: string): Promise<boolean> {
    const existingNew = await this.repo.findOne({
      where: {
        objectID,
      },
    });

    if (!existingNew) {
      throw new NotFoundException(ERROR_NEW_NOT_EXIST);
    }

    this.repo.remove(existingNew);
    return true;
  }
}
