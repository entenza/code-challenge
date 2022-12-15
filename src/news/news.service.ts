import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { CommonNewsDto } from 'src/common/dtos/common-news.dto';
import { GetNewsRequest } from 'src/common/request/getNews.request';
import {
  ERROR_FETCHING_FROM_API,
  ERROR_INSERTING_NEWS,
} from '../common/errors';
import { NewsPgRepository } from './news-pg-respository';

@Injectable()
export class NewsService {
  private url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

  constructor(private readonly NewsPgRepository: NewsPgRepository) {}

  private async insertNews(news: CommonNewsDto): Promise<void> {
    try {
      this.NewsPgRepository.storeNew(news);
    } catch (error) {
      throw new Error(ERROR_INSERTING_NEWS);
    }
  }

  async getAllNews(query: GetNewsRequest) {
    const list = await this.NewsPgRepository.findAll(query);

    return list.map((item) => {
      // don't what to deleted field...
      delete item.deleted;
      /**
       * This is only to format the data of the tags..
       * they are received as an array, but stored as string splitted by comas
       * then we have to make it an array as well so it might looks the same...
       */
      return {
        ...item,
        tags: item.tags.split(','),
      };
    });
  }

  async processNews(): Promise<void> {
    const newsList = await this.fetchFromHackerNews();
    newsList.map((item: CommonNewsDto) => this.insertNews(item));
  }

  async fetchFromHackerNews(): Promise<CommonNewsDto[]> {
    try {
      const { data } = await axios.get(this.url, {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      });

      return data.hits.map((item) => {
        return plainToClass(CommonNewsDto, item, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        });
      });
    } catch (error) {
      console.log('====================================================');
      console.log('AXIOS ERROR ', error.cause);
      console.log('====================================================');

      throw new Error(ERROR_FETCHING_FROM_API);
    }
  }
}
