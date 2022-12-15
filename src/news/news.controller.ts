import { Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';
import { ERROR_FETCHING_FROM_API } from 'src/common/errors';
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

  @Put()
  async updateNews() {}

  @Get('fetch')
  async fetchFromHackerNews(@Res() response) {
    try {
      const result = await this.newsService.fetchFromHackerNews();
      response.send(result);
    } catch (error) {
      console.log('====================================================')
      console.log(error);
      console.log('====================================================')
      return response.status(HttpStatus.BAD_REQUEST).send({
        error: ERROR_FETCHING_FROM_API,
      });
    }
  }
}
