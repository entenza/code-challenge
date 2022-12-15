import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { CommonNewsDto } from "src/common/dtos/common-news.dto";
import { ICommonNews } from "src/common/interfaces/common-news.interface";
import { ERROR_FETCHING_FROM_API, ERROR_INSERTING_NEWS } from '../common/errors'
import { NewsPgRepository } from "./news-respository";


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

  async getAllNews(){
    return await this.NewsPgRepository.findAll()
  }

  async processNews(): Promise<void> {
    const newsList = await this.fetchFromHackerNews();
    newsList.map((item: CommonNewsDto) => this.insertNews(item));

  }

  async fetchFromHackerNews(): Promise<CommonNewsDto[]> {
    try {
      const { data, status } = await axios.get(this.url, {
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