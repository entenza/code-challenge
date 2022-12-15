import { Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';
import {
  ERROR_FETCHING_FROM_API,
  ERROR_INSERTING_NEWS,
} from 'src/common/errors';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getNews() {
    return {
      success: true,
      message: 'News succesfully processed',
    };
  }

  @Get('process')
  async processNews(@Res() response) {
    try {
      await this.newsService.processNews();
      response.status(HttpStatus.OK).send({
        success: true,
        message: 'News succesfully processed',
      });
    } catch (error) {
      let message = 'UNKNOWN ERROR';

      if (error === ERROR_FETCHING_FROM_API) message = ERROR_FETCHING_FROM_API;
      if (error === ERROR_INSERTING_NEWS) message = ERROR_INSERTING_NEWS;

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: true,
        message,
      });
    }

    return {};
  }

  @Put()
  async updateNews() {}

  @Get('fetch')
  async fetchFromHackerNews(@Res() response) {
    try {
      const result = await this.newsService.fetchFromHackerNews();
      response.send(result);
    } catch (error) {
      console.log('====================================================');
      console.log(error);
      console.log('====================================================');
      return response.status(HttpStatus.BAD_REQUEST).send({
        error: ERROR_FETCHING_FROM_API,
      });
    }
  }
}
